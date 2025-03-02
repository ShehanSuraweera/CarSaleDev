// app/hooks/useAuthListener.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setSession } from "../features/user/userSlice";
import { createSupabaseClient } from "@/src/auth/client";

const supabaseBrowserClient = createSupabaseClient();

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session));
        dispatch(setUser(session?.user ?? null));
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};
