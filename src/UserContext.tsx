"use client";

import apiClient from "@/src/services/api-client";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  useCallback,
} from "react";
import { useRouter } from "next/navigation"; // For navigation
import { userAuthenticator } from "@/src/lib/api";

// Define the user data structure
interface User {
  user_name: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  ready: boolean;
}

// Create UserContext
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to verify an existing user
  const verifyStoredUser = useCallback(
    async (storedUser: User) => {
      try {
        const authenticatedUser = await userAuthenticator();
        if (authenticatedUser.username === storedUser.user_name) {
          console.log("Authenticated user:", storedUser);
          setUser(storedUser);
        } else {
          throw new Error("Token mismatch");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
      }
    },
    [router]
  );

  // Function to fetch the user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await apiClient.get<User>("/auth/profile");
      console.log("Fetched user profile:", response.data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        setError("Unable to load user profile. Please try again later.");
      }
    }
  }, [router]);
  // Initialization function
  const initializeUser = useCallback(async () => {
    setReady(false);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      await verifyStoredUser(parsedUser);
    } else {
      await fetchUserProfile();
    }

    setReady(true);
  }, [fetchUserProfile, verifyStoredUser]);

  // Initialize the user state on mount
  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
