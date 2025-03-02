"use client";

import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
// import { useUser } from "../UserContext";
import toast from "react-hot-toast";
import {
  setUser,
  setSession,
  fetchUserProfile,
} from "@/src/redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { createSupabaseClient } from "../auth/client";

// Declare google as a global variable
declare const google: any;

const supabaseBrowserClient = createSupabaseClient();

const OneTapComponent = () => {
  // const { supabaseBrowserClient } = useUser();

  const router = useRouter();
  const dispatch = useDispatch();

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

  const initializeGoogleOneTap = useCallback(async () => {
    const [nonce, hashedNonce] = await generateNonce();

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
          const session = data.session;
          const user = session?.user;

          if (user) {
            dispatch(setUser(user)); // Store user in Redux
            dispatch(setSession(session)); // Store session in Redux
            dispatch(fetchUserProfile(user.id) as any); // Fetch user profile

            toast.success("Successfully logged in with Google One Tap");
            // redirect to protected page
            router.push("/");
          }
        } catch (error) {
          console.error("Error logging in with Google One Tap", error);
          toast.error("Failed to log in with Google One Tap");
        }
      },
      nonce: hashedNonce,
      // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt(); // Display the One Tap UI
  }, [supabaseBrowserClient.auth, router]);

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
  }, [initializeGoogleOneTap]);

  return <div id="oneTap" className="fixed top-0 right-0 z-[100]" />;
};

export default OneTapComponent;
