// app/hooks/useAuthListener.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setSession } from "../features/user/userSlice";
import { createSupabaseClient } from "@/src/auth/client";
import toast from "react-hot-toast";
import { fetchUserLikedAdIds } from "../features/ad/likedAdSlice";
import { AppDispatch } from "../store";

const supabaseBrowserClient = createSupabaseClient();

export const useAuthListener = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("authListener", _event, session);
        dispatch(setSession(session));
        dispatch(setUser(session?.user ?? null));

        if (session) {
          try {
            await dispatch(fetchUserLikedAdIds()).unwrap();
          } catch (error) {
            console.error("Error fetching liked ads:", error);
          }
        }

        if (_event === "SIGNED_IN" && session) {
          toast.success("Successfully logged in");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};
