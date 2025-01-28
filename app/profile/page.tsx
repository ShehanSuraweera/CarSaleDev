"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Button } from "@heroui/button";
import apiClient from "@/services/api-client";
import { useRouter } from "next/navigation";
import { Chip, Divider, Spinner, Tab, Tabs } from "@heroui/react";
import { UserIcon } from "@/components/icons";
import ConfirmationBox from "@/components/ConfirmationBox";
import { fetchUserAds, userAuthenticator } from "@/lib/api";
import CarList from "@/components/Cars/CarList";
import LoginModel from "@/components/LoginModel";

const Page = () => {
  const { ready, user, setUser } = useContext(UserContext) ?? {};
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const reDirect = () => {
    router.push("/sell");
  };

  const getCarsFromBackend = async () => {
    if (!user?.user_name) return; // Ensure user is logged in

    try {
      setLoading(true);
      const fetchedCars = await fetchUserAds(user.user_name);
      setCars(fetchedCars);
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

  // Handle login modal close
  const handleOnClose = () => {
    console.log("Modal is closing... profile" + " " + ready + " " + user);
    setShowLoginModal(false);

    if (!ready) {
      return <Spinner color="warning" label="Loading..." />;
    }

    if (!user) {
      router.push("/");
    } else {
      router.push("/profile");
    }
  };

  // Handle logout confirmation
  const handleConfirm = async () => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem("user");
      setUser?.(null); // Clear user context
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setModalOpen(false);
    }
  };

  // Handle Logout
  function handleLogout() {
    setModalOpen(true);
  }

  // Trigger login modal if the user is not logged in
  useEffect(() => {
    if (ready && !user) {
      setShowLoginModal(true);
    }
  }, [ready, user]);

  // Fetch data when a tab is selected
  useEffect(() => {
    if (selected === "myAds") {
      getCarsFromBackend();
    }
  }, [selected]);

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
