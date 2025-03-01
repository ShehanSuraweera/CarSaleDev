"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { fetchUserProfile } from "@/src/redux/features/user/userSlice";
import UserMetaCard from "./opensource/user-profile/UserMetaCard";
import UserAddressCard from "./opensource/user-profile/UserAddressCard";
import UserInfoCard from "./opensource/user-profile/UserInfoCard";

function ProfileContent() {
  const dispatch = useDispatch();
  const { user, profile, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [userProfileData, setUserProfileData] = useState(profile || null);

  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchUserProfile(user.id) as any);
    }
  }, [user, profile, dispatch]);

  useEffect(() => {
    if (profile) {
      setUserProfileData(profile);
    }
  }, [profile]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  // if (error) {
  //   return <p className="text-center text-red-500">Failed to load profile.</p>;
  // }

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
