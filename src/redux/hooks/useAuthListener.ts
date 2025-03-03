// app/hooks/useAuthListener.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setSession } from "../features/user/userSlice";
import { createSupabaseClient } from "@/src/auth/client";
import toast from "react-hot-toast";

const supabaseBrowserClient = createSupabaseClient();

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (_event, session) => {
        console.log("authListener", _event, session);
        dispatch(setSession(session));
        dispatch(setUser(session?.user ?? null));

        if (_event === "SIGNED_IN" && session) {
          toast.success("Successfully logged in with Google");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};
