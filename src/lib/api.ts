import apiClient from "@/src/services/api-client";
import { convertAndUploadBlobs } from "../config/uploadBlobs";

export const fetchAds = async () => {
  try {
    const response = await apiClient.get("/uploads/ads");
    if (response.status !== 200) {
      throw new Error("Failed to fetch ads");
    }
    return response.data.ads;
  } catch (error: any) {
    console.error("Error fetching  ads:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch  ads");
  }
};

export const fetchTrendingAds = async (make: string, type: string) => {
  try {
    const response = await apiClient.post("/uploads/trending-ads", {
      make: make,
      type: type,
    });

    return response.data.ads;
  } catch (error: any) {
    console.error("Error fetching  ads:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch  ads");
  }
};

export const fetchAd = async (ad_id: string) => {
  try {
    const response = await apiClient.post("/uploads/ad", {
      ad_id: ad_id,
    });

    return response.data.ad;
  } catch (error: any) {
    console.error("Error fetching  ads:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch  ads");
  }
};

export const fetchUserAds = async (id: string) => {
  try {
    const response = await apiClient.post("/uploads/user-ads", {
      id: id,
    });

    return response.data.ads;
  } catch (error: any) {
    console.error("Error fetching  ads:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch  ads");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    if (response.data.user) {
      // Return the user data if login is successful
      return response.data.user;
    } else {
      // Handle cases where the API response is unexpected
      throw new Error("Invalid login response. Please try again.");
    }
  } catch (error: any) {
    console.error("Error logging in:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const userAuthenticator = async () => {
  try {
    const response = await apiClient.get("/auth/verify-token");
    if (response.data.user) {
      return response.data.user;
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error: any) {
    console.error("Error authenticating user:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to authenticate user"
    );
  }
};

export const getUserProfileData = async (id: string) => {
  try {
    const response = await apiClient.post("/user/profile", {
      user_id: id,
    });

    return response.data.user;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

export const createAd = async (formData: FormData, imageUrls: string[]) => {
  try {
    const response = await apiClient.post("/uploads/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let adId = 0;

    if (response.status === 201) {
      const data = response.data; // Access data directly
      adId = data.adId;
      // Access adId
    } else {
      console.error("Failed to post ad:", response.status);
      return "Failed";
    }

    const bucketName = "ad_pics"; // Supabase storage bucket name
    try {
      await convertAndUploadBlobs(imageUrls, adId.toString(), bucketName); // Upload images to Supabase storage

      return "Adposted";
    } catch (error) {
      console.error("Error uploading images:", error);
      return "Failed to upload images";
    }
  } catch (error) {
    console.error("Error posting ad:", error);
    return "Error";
  }
};

export const updateUserProfile = async (formData: FormData) => {
  try {
    const response = await apiClient.post("/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return "Profile updated";
    } else {
      console.error("Failed to update profile:", response.status);
      return "Failed";
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return "Error";
  }
};
