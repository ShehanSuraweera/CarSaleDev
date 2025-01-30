"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { Chip, Divider, Tab, Tabs } from "@heroui/react";
import { fetchUserAds, getUserProfileData } from "@/src/lib/api";
import CarList from "@/src/components/Cars/CarList";
import SignOut from "@/src/components/SignOut";
import { UserProfileData } from "@/src/types";
import { Loader2 } from "lucide-react";
import { useUser } from "@/src/UserContext";

const Page = () => {
  const router = useRouter();

  const [selected, setSelected] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  const { user } = useUser();

  // Fetch user profile data when user state updates
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id as string);
          setUserProfileData(fetchUserProfile[0]); // Ensure profile data is set correctly
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      })();
    }
  }, [user]); // Only depend on `user`,

  // Fetch cars when "myAds" tab is selected
  useEffect(() => {
    const getCarsFromBackend = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const fetchedCars = await fetchUserAds(user.id as string);
        setCars(fetchedCars);
      } catch (error: any) {
        setError(error.message || "Failed to load ads");
      } finally {
        setLoading(false);
      }
    };

    if (selected === "myAds") {
      getCarsFromBackend();
    }
  }, [selected, user]); // Ensure `user` is in the dependency array

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-5 bg-slate-50">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center mb-5 ">
          <div>
            <Button color="warning" onPress={() => router.push("/sell")}>
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
                  userProfileData ? (
                    <>
                      <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                        <div>Name</div>

                        <div>{userProfileData?.name}</div>
                      </div>
                      <Divider />
                      <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                        <div>Email</div>
                        <div>{userProfileData?.email}</div>
                      </div>
                      <Divider />
                      <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                        <div>Phone</div>
                        <div>{userProfileData?.phone}</div>
                      </div>
                      <Divider />
                      <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                        <div>City</div>

                        <div>{userProfileData?.city}</div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-20">
                      <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                    </div>
                  )
                ) : (
                  <div>No user data available</div>
                )}
              </div>
            </Tab>
            <Tab key="myAds" title="myAds">
              {loading ? (
                <div className="flex items-center justify-center h-20">
                  <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                </div>
              ) : cars.length > 0 ? (
                <CarList cars={cars} loading={loading} error={error} />
              ) : (
                <div>No ads available!</div>
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

      <div className="flex flex-col items-center gap-2 rounded-md ">
        <SignOut />
      </div>
    </div>
  );
};

export default Page;
