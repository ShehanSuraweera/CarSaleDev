"use client";

import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../UserContext";

// Declare google as a global variable
declare const google: any;

const OneTapComponent = () => {
  const { supabaseBrowserClient } = useUser();
  const router = useRouter();

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
    );
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return [nonce, hashedNonce];
  };

  const initializeGoogleOneTap = async () => {
    console.log("Initializing Google One Tap");
    const [nonce, hashedNonce] = await generateNonce();
    console.log("Nonce: ", nonce, hashedNonce);

    // check if there's already an existing session before initializing the one-tap UI
    const { data, error } = await supabaseBrowserClient.auth.getSession();
    if (error) {
      console.error("Error getting session", error);
    }
    if (data.session) {
      router.push("/");
      return;
    }

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: CredentialResponse) => {
        try {
          // send id token returned in response.credential to supabase
          const { data, error } =
            await supabaseBrowserClient.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
              nonce,
            });

          if (error) throw error;
          console.log("Session data: ", data);
          console.log("Successfully logged in with Google One Tap");

          // redirect to protected page
          router.push("/");
        } catch (error) {
          console.error("Error logging in with Google One Tap", error);
        }
      },
      nonce: hashedNonce,
      // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt(); // Display the One Tap UI
  };

  useEffect(() => {
    // Only trigger once when the script is loaded
    const scriptLoaded = () => {
      initializeGoogleOneTap();
    };

    // Load the Google One Tap script
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://accounts.google.com/gsi/client";
    scriptElement.onload = scriptLoaded;
    document.body.appendChild(scriptElement);

    return () => {
      document.body.removeChild(scriptElement); // Clean up the script when the component unmounts
    };
  }, []);

  return <div id="oneTap" className="fixed top-0 right-0 z-[100]" />;
};

export default OneTapComponent;
