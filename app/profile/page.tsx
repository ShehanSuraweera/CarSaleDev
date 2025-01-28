"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Button } from "@heroui/button";
import apiClient from "@/services/api-client";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import OwnerDetails from "@/components/OwnerDetails";
import { Chip, Divider, Spinner, Tab, Tabs } from "@heroui/react";
import MiddleTab from "@/components/MiddleTab";
import { UserIcon } from "@/components/icons";
import ConfirmationBox from "@/components/ConfirmationBox";
import { title } from "process";
import { fetchUserAds, userAuthenticator } from "@/lib/api";
import CarList from "@/components/Cars/CarList";
import LoginModel from "@/components/LoginModel";
import Link from "next/link";

const Page = () => {
  const { ready, user, setUser } = useContext(UserContext) ?? {};
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const reDirect = () => {
    router.push("/sell");
  };

  const getCarsFromBackend = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCars = user?.user_name
        ? await fetchUserAds(user.user_name)
        : []; // Fetch the data
      setCars(fetchedCars); // Update state with the fetched cars
    } catch (error: any) {
      if (error.message === "AUTHENTICATION_ERROR") {
        setShowLoginModal(true); // Trigger login modal
      } else {
        console.error("Error fetching ads:", error);
      }
      setError(error.message || "Failed to load ads");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getCarsFromBackend();
    if (selected === "myAds") {
      getCarsFromBackend();
    }
    if (selected === "postAd") {
      reDirect();
    }
  }, [selected]);

  const handleOnClose = async () => {
    console.log("Modal is closing...");

    try {
      const authenticatedUser = await userAuthenticator();
      console.log(authenticatedUser.username);
      if (authenticatedUser.username === user?.user_name) {
        console.log("User is authenticated");
        setAuthenticated(true);
      } else {
        console.log("User is not authenticated");
        setAuthenticated(false);
        localStorage.removeItem("user");

        router.push("/login");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      localStorage.removeItem("user");
      router.push("/login");
    }

    setShowLoginModal(false);
  };

  const handleConfirm = async () => {
    console.log("Confirmed!");
    setModalOpen(false);

    try {
      await apiClient.post("/auth/logout"); // Log the user out
      localStorage.removeItem("user");
      if (setUser) {
        setUser(null);
      }
      // Remove user from localStorage
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally display an error message if logout fails
    }
  };

  // Handle Logout
  function handleLogout() {
    setModalOpen(true);
  }

  useEffect(() => {
    if (!ready) return; // Wait until user context is ready

    if (!user) {
      // Redirect to login page if the user is not logged in
      router.push("/login");
    }
  }, [user, ready, router]); // Run the effect when user or ready state changes

  // Your profile page content here
  if (!user) {
    return <Spinner color="warning" label="Loading..." />; // Optionally show a loading message until the redirect happens
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-5 bg-slate-50">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center mb-5 ">
          <div>
            <Button color="warning" onPress={reDirect}>
              Post Ad
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-2 rounded-md ">
          <Tabs
            size="lg"
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="profile" title="Profile">
              <div>
                {user ? (
                  <>
                    <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                      <div>Name</div>

                      <div>{user.name}</div>
                    </div>
                    <Divider />
                    <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                      <div>Email</div>
                      <div>{user.email}</div>
                    </div>
                    <Divider />
                    <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                      <div>Phone</div>
                      <div>{user.phone}</div>
                    </div>
                    <Divider />
                    <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                      <div>City</div>

                      <div>{user.city}</div>
                    </div>
                  </>
                ) : (
                  <div>No user data available</div>
                )}
              </div>
            </Tab>
            <Tab key="myAds" title="myAds">
              {cars && cars.length > 0 ? (
                <div className="">
                  <CarList cars={cars} loading={loading} error={error} />
                </div>
              ) : (
                <div>
                  <div>Sorry currently No ads available!</div>
                </div>
              )}
            </Tab>

            <Tab
              key="favourites"
              title={
                <div className="flex items-center space-x-1">
                  <span>favourites</span>
                  <Chip size="sm" variant="faded">
                    0
                  </Chip>
                </div>
              }
            >
              favourites
            </Tab>
          </Tabs>
        </div>
      </div>
      <LoginModel isOpen={showLoginModal} onClose={handleOnClose} />
      <div className="flex flex-col items-center gap-2 rounded-md ">
        <Button
          className=""
          color="danger"
          startContent={<UserIcon />}
          variant="bordered"
          onPress={handleLogout}
        >
          Log out
        </Button>
      </div>
      <ConfirmationBox
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default Page;
