import apiClient from "@/src/services/api-client";
import { convertAndUploadBlobs } from "../config/uploadBlobs";

export const fetchAds = async (
  searchParams: {
    query?: string;
    make?: string;
    model?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    maxMileage?: string;
    buildYear?: string;
    bodyType?: string;
    transmission?: string;
    location?: string;
  } = {}
) => {
  try {
    const queryParams = new URLSearchParams();

    if (searchParams.query) queryParams.append("query", searchParams.query);
    if (searchParams.make) queryParams.append("make", searchParams.make);
    if (searchParams.model) queryParams.append("model", searchParams.model);
    if (searchParams.type) queryParams.append("type", searchParams.type);
    if (searchParams.minPrice)
      queryParams.append("minPrice", searchParams.minPrice.toString());
    if (searchParams.maxPrice)
      queryParams.append("maxPrice", searchParams.maxPrice.toString());
    if (searchParams.maxMileage)
      queryParams.append("maxMileage", searchParams.maxMileage.toString());
    if (searchParams.buildYear)
      queryParams.append("buildYear", searchParams.buildYear.toString());
    if (searchParams.bodyType)
      queryParams.append("bodyType", searchParams.bodyType);
    if (searchParams.transmission)
      queryParams.append("transmission", searchParams.transmission);
    if (searchParams.location)
      queryParams.append("location", searchParams.location);

    const response = await apiClient.get(
      `/uploads/ads?${queryParams.toString()}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch ads");
    }
    return response.data.ads;
  } catch (error: any) {
    console.error("Error fetching ads:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch ads");
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

export const createAd = async (
  formData: FormData,
  imageUrls: string[]
): Promise<string> => {
  try {
    const response = await apiClient.post("/uploads/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201 || !response.data?.adId) {
      console.error("Failed to post ad:", response.status, response.data);
      return response.data?.message || "Failed to post ad";
    }

    const adId = response.data.adId;
    const bucketName = "ad_pics"; // Supabase storage bucket name

    try {
      const result = await convertAndUploadBlobs(
        imageUrls,
        adId.toString(),
        bucketName
      ); // Upload images to Supabase storage
      console.log("result", result);

      return "Adposted";
    } catch (error) {
      console.error("Error uploading images:", error);
      return "Failed to upload images";
    }
  } catch (error: any) {
    console.error("Error posting ad:", error);
    return error.response?.data?.message || "Server error";
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
