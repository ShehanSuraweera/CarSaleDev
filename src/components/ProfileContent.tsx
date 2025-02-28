"use client";
import React, { useEffect, useState } from "react";
import UserMetaCard from "./opensource/user-profile/UserMetaCard";
import { useUser } from "../UserContext";
import { UserProfileData } from "../types";
import { getUserProfileData } from "../lib/api";
import UserAddressCard from "./opensource/user-profile/UserAddressCard";
import UserInfoCard from "./opensource/user-profile/UserInfoCard";

function ProfileContent() {
  const { user, loading } = useUser();
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  // const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!user) return;

  //   setIsLoading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append("user_id", user.id);
  //     formData.append("name", userProfileData?.name || "");
  //     formData.append("phone", userProfileData?.phone || "");
  //     formData.append("city_id", String(selectedCityId));

  //     const response = await updateUserProfile(formData);

  //     if (response === "Profile updated") {
  //       toast.success("Profile updated successfully");
  //       handleUpdateProfileModel(false); // Close modal on success
  //     } else {
  //       toast.error("Failed to update profile");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     toast.error("An error occurred while updating the profile");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id);
          setUserProfileData(fetchUserProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      })();
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full h-full gap-5 p-2 rounded-md shadow-md sm:p-10">
      <UserMetaCard
        avatar_url={userProfileData?.avatar_url || ""}
        email={userProfileData?.email || ""}
        user_type={userProfileData?.user_type || ""}
        name={userProfileData?.name || ""}
      />
      <UserInfoCard
        email={userProfileData?.email || ""}
        first_name={userProfileData?.first_name || ""}
        last_name={userProfileData?.last_name || ""}
        phone={userProfileData?.phone || ""}
        user_type={userProfileData?.user_type || ""}
      />
      <UserAddressCard
        city={userProfileData?.city?.name || ""}
        country="Sri Lanka"
        district={userProfileData?.district?.name || ""}
        province={userProfileData?.province?.name || ""}
      />
    </div>
  );
}

export default ProfileContent;
