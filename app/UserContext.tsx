"use client";
import apiClient from "@/services/api-client";
import { createContext, useEffect, useState, ReactNode, FC } from "react";
import { useRouter } from "next/navigation"; // For navigation
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
  // Initialize the router
  useEffect(() => {
    // Try to load the user from localStorage first
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser)); // Load user from storage
      setReady(true);
    } else {
      // If no stored user, fetch from the API
      apiClient
        .get<User>("/auth/profile")
        .then((response) => {
          console.log("User data fetched", JSON.stringify(response.data));
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // Persist in localStorage
          setReady(true);
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);

          if (error.response?.status === 401) {
            // Unauthorized: redirect to login
            router.push("/login");
          } else {
            // Handle other errors
            setError("Unable to load user profile. Please try again later.");
          }

          setReady(true); // Ensure ready state is updated
        });
    }

    // Cleanup function to avoid memory leaks
    return () => {
      setError(null); // Clear any errors on unmount
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
