"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { fetchUserProfile } from "@/src/redux/features/user/userSlice";
import UserMetaCard from "./opensource/user-profile/UserMetaCard";
import UserAddressCard from "./opensource/user-profile/UserAddressCard";
import UserInfoCard from "./opensource/user-profile/UserInfoCard";
import UserMetaCardSkeleton from "./opensource/user-profile/UserMetaCardSkeleton";
import UserInfoCardSkeleton from "./opensource/user-profile/UserInfoCardSkeleton";
import UserAddressCardSkeleton from "./opensource/user-profile/UserAddressCardSkeleton";

function ProfileContent() {
  const dispatch = useDispatch();
  const { user, profile, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile(user.id) as any);
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col w-full h-full gap-5 p-2 rounded-md shadow-md sm:p-10">
        <UserMetaCardSkeleton />
        <UserInfoCardSkeleton />
        <UserAddressCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-5 p-2 rounded-md shadow-md sm:p-10">
      <UserMetaCard
        avatar_url={profile?.avatar_url || ""}
        email={profile?.email || ""}
        user_type={profile?.user_type || ""}
        name={profile?.name || ""}
      />
      <UserInfoCard
        email={profile?.email || ""}
        name={profile?.name || ""}
        phone={profile?.phone || ""}
        user_type={profile?.user_type || ""}
      />
      <UserAddressCard
        city={profile?.city?.name || ""}
        country="Sri Lanka"
        district={profile?.district?.name || ""}
      />
    </div>
  );
}

export default ProfileContent;
