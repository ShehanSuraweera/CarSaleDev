// app/hooks/useAuthListener.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setSession } from "../features/user/userSlice";
import { createBrowserClient } from "@supabase/ssr";

const supabaseBrowserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
