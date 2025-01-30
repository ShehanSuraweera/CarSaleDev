"use client"; // ✅ Ensures this runs on the client
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2 } from "lucide-react";

// Type definitions for context
interface UserContextType {
  user: User | null;
  session: Session | null;
  supabaseBrowserClient: ReturnType<typeof createBrowserClient>;
  setUser: (user: User | null) => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserContext Provider Component
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Create Supabase client
  const supabaseBrowserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabaseBrowserClient.auth.getSession(); // ✅ Directly fetch session
        console.log("fetchUser -> data", data.session?.user);
        setUser(data.session?.user ?? null);
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // ✅ Listen for authentication state changes (login/logout)
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (_event, session) => {
        setLoading(true);
        console.log("onAuthStateChange -> session", session?.user);
        setUser(session?.user ?? null);
        setSession(session);
        setLoading(false);
      }
    );

    // Cleanup the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseBrowserClient, setUser]); // ✅ Include `supabase` in dependency array

  return (
    <UserContext.Provider
      value={{ user, session, supabaseBrowserClient, setUser }}
    >
      {!loading ? children : <Loader2 className=" animate-spin" />}
    </UserContext.Provider>
  );
};

// Hook to use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within a UserContextProvider");
  return context;
};
