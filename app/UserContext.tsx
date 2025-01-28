"use client";
import apiClient from "@/services/api-client";
import { createContext, useEffect, useState, ReactNode, FC } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { userAuthenticator } from "@/lib/api";
import LoginModal from "@/components/LoginModel";
// Define the user data structure
interface User {
  user_name: string;
  name: string;
  email: string;
  phone: string;
  city: string;

  // Add other user fields as needed
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  ready: boolean;
}

// Create UserContext with a default empty value
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

  const initializeUser = async () => {
    setReady(false);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      try {
        // Verify the token by calling the API
        //await apiClient.get("/auth/verify-token");
        const authenticatedUser = await userAuthenticator();

        if (authenticatedUser.username === parsedUser.user_name) {
          setUser(parsedUser);
          setReady(true);
        } else {
          router.push("/login");
          localStorage.removeItem("user");
        }
      } catch (error: any) {
        console.error("Token verification failed:", error);

        if (error.response?.status === 401) {
          // If the token is invalid, remove the user and redirect to login
          setReady(true);
          router.push("/login");
          //localStorage.removeItem("user");
          setUser(null);
        } else {
          // Handle other errors
          setError("Unable to verify the user. Please try again later.");
        }

        setReady(true);
      }
    } else {
      try {
        // If no stored user, fetch from the API
        const response = await apiClient.get<User>("/auth/profile");

        console.log("User data fetched", JSON.stringify(response.data));

        // Save user data in context and localStorage
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setReady(true);
      } catch (error: any) {
        console.error("Failed to fetch profile:", error);

        if (error.response?.status === 401) {
          // Unauthorized: redirect to login
          router.push("/login");
        } else {
          // Handle other errors
          setError("Unable to load user profile. Please try again later.");
        }

        setReady(true); // Ensure ready state is updated
      }
    }
  };
  // Initialize the router
  useEffect(() => {
    initializeUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
