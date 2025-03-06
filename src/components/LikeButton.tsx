import { useDispatch, useSelector } from "react-redux";
import { likeAd, unlikeAd } from "@/src/lib/api";
import toast from "react-hot-toast";
import { Heart, HeartOff } from "lucide-react";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchUserLikedAdIds,
  toggleLike,
} from "../redux/features/ad/likedAdSlice";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { HeartFilledIcon, HeartIcon } from "./icons";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  adId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ adId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const likedAds = useSelector((state: RootState) => state.likedAds.likedAds);
  const status = useSelector((state: RootState) => state.likedAds.status);
  const router = useRouter();

  // Check if the ad is liked
  const isLiked = likedAds.includes(adId);

  // Fetch liked ads when the component mounts
  useEffect(() => {
    if (userId && status === "idle") {
      dispatch(fetchUserLikedAdIds());
    }
  }, [userId, status, dispatch]);

  const handleLike = async () => {
    if (!userId) {
      toast.error("Please login to like ads.");
      router.push("/login");
      return;
    }

    try {
      if (isLiked) {
        await unlikeAd(adId, userId);
        dispatch(toggleLike(adId));
        toast.success("Ad removed from favorites.");
      } else {
        await likeAd(adId, userId);
        dispatch(toggleLike(adId));
        toast.success("Ad added to favorites!");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const debouncedHandleLike = debounce(handleLike, 300);

  return (
    <>
      <Button
        onPress={debouncedHandleLike}
        variant="light"
        color={isLiked ? "warning" : "primary"}
        aria-label={isLiked ? "Unlike ad" : "Like ad"}
        className={`p-2 rounded-full transition min-w-4 sm:min-w-8 text-blue-700 dark:text-[#FDC221] ${
          isLiked ? "text-[#01172F]" : "text-gray-500 hover:text-blue-950"
        }`}
      >
        {isLiked ? <HeartFilledIcon size={28} /> : <HeartIcon />}
      </Button>
    </>
  );
};

export default LikeButton;
