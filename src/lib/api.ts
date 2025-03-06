import apiClient from "@/src/services/api-client";
import { convertAndUploadBlobs } from "../config/uploadBlobs";

export const fetchAds = async (searchParams: {
  query?: string;
  make_id?: string;
  model_id?: string;
  minPrice?: string;
  maxPrice?: string;
  maxMileage?: string;
  buildYear?: string;
  transmission_type_id?: string;
  district_id?: string;
  city_id?: string;
  body_type_id?: string;
  vehicle_type_id?: string;
  fuel_type_id?: string;
  vehicle_condition_id: string;
  page: number;
  limit: number;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (searchParams.query) queryParams.append("query", searchParams.query);
    if (searchParams.make_id)
      queryParams.append("make_id", searchParams.make_id);
    if (searchParams.model_id)
      queryParams.append("model_id", searchParams.model_id);
    if (searchParams.minPrice)
      queryParams.append("minPrice", searchParams.minPrice.toString());
    if (searchParams.maxPrice)
      queryParams.append("maxPrice", searchParams.maxPrice.toString());
    if (searchParams.maxMileage)
      queryParams.append("maxMileage", searchParams.maxMileage.toString());
    if (searchParams.buildYear)
      queryParams.append("buildYear", searchParams.buildYear.toString());
    if (searchParams.body_type_id)
      queryParams.append("body_type_id", searchParams.body_type_id);
    if (searchParams.transmission_type_id)
      queryParams.append(
        "transmission_type_id",
        searchParams.transmission_type_id
      );
    if (searchParams.district_id)
      queryParams.append("district_id", searchParams.district_id.toString());
    if (searchParams.city_id)
      queryParams.append("city_id", searchParams.city_id.toString());
    if (searchParams.vehicle_type_id)
      queryParams.append(
        "vehicle_type_id",
        searchParams.vehicle_type_id.toString()
      );
    if (searchParams.fuel_type_id)
      queryParams.append("fuel_type_id", searchParams.fuel_type_id.toString());
    if (searchParams.vehicle_condition_id)
      queryParams.append(
        "vehicle_condition_id",
        searchParams.vehicle_condition_id.toString()
      );

    if (searchParams.page)
      queryParams.append("page", searchParams.page.toString());
    if (searchParams.limit)
      queryParams.append("limit", searchParams.limit.toString());

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

export const fetchTrendingAds = async (
  make_id: string,
  vehicle_type_id: string
) => {
  try {
    const response = await apiClient.post("/uploads/trending-ads", {
      make_id,
      vehicle_type_id,
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

    const adId = response.data.adId.toString();
    const bucketName = "ad_pics"; // Supabase storage bucket name

    try {
      const result = await convertAndUploadBlobs(imageUrls, adId, bucketName); // Upload images to Supabase storage

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

export const getAllDistricts = async () => {
  try {
    const response = await apiClient.get("/info/districts");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching districts:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch districts"
    );
  }
};

export const getCitiesByDistrict = async (districtId: number) => {
  try {
    const response = await apiClient.get(`/info/cities/${districtId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching cities:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch cities");
  }
};

export const getAllCities = async () => {
  try {
    const response = await apiClient.get(`/info/allcities`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching cities:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch cities");
  }
};

export const getVehicleTypes = async () => {
  try {
    const response = await apiClient.get("/info/vehicle-types");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching vehicle types:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch vehicle types"
    );
  }
};

export const getMakeByVehicleType = async (vehicle_type_id: number) => {
  try {
    const response = await apiClient.get(
      `/info/vehicle-makes/${vehicle_type_id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching makes:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch makes");
  }
};

export const getModelsByMake = async (
  make_id: number,
  vehicle_type_id: number
) => {
  try {
    const response = await apiClient.post("/info/vehicle-models", {
      make_id,
      vehicle_type_id,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching models:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch makes");
  }
};

export const editAd = async (formData: FormData, imageUrls: string[]) => {
  try {
    const response = await apiClient.post("/uploads/edit-ad", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      console.error("Failed to edit ad:", response.status);
      return response.data?.message || "Failed to edit ad";
    }

    const adId = response.data.data.ad_id.toString();
    const bucketName = "ad_pics"; // Supabase storage bucket name

    try {
      const result = await convertAndUploadBlobs(imageUrls, adId, bucketName); // Upload images to Supabase storage

      return "AdEdited";
    } catch (error) {
      console.error("Error uploading images:", error);
      return "Failed to upload images";
    }
  } catch (error: any) {
    console.error("Error editing ad:", error);
    return error.response?.data?.message || "Server error";
  }
};

export const deleteAd = async (ad_id: string) => {
  try {
    await apiClient.post("/uploads/delete-ad", { ad_id });
    return "ad_deleted";
  } catch (error) {
    console.log("failed to delete ad", error);
    return ""; // Explicitly return null on failure
  }
};

export const getAllMakes = async () => {
  try {
    const response = await apiClient.get("/info/vehicle-makes");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching makes:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch makes");
  }
};

export const fetchModels = async (searchParams: { make_id?: string }) => {
  try {
    const queryParams = new URLSearchParams();

    if (searchParams.make_id)
      queryParams.append("make_id", searchParams.make_id);

    const response = await apiClient.get(
      `/info/models?${queryParams.toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching makes:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to fetch makes");
  }
};

export const getBodyTypes = async (searchParams: {
  vehicle_type_id?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (searchParams.vehicle_type_id)
      queryParams.append("vehicle_type_id", searchParams.vehicle_type_id);

    const response = await apiClient.get(
      `/info/body-types?${queryParams.toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching body types:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch body types"
    );
  }
};

export const getTransmissionTypes = async () => {
  try {
    const response = await apiClient.get("/info/transmission-types");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transmission types:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transmission types"
    );
  }
};

export const getFuelTypes = async () => {
  try {
    const response = await apiClient.get("/info/fuel-types");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching fuel types:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch fuel types"
    );
  }
};

export const getVehicleConditions = async () => {
  try {
    const response = await apiClient.get("/info/vehicle-conditions");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching fuel types:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch fuel types"
    );
  }
};

export const likeAd = async (adId: string, userId: string) => {
  try {
    const response = await apiClient.post(`/user/like-ad`, { adId, userId });
    return response.data;
  } catch (error: any) {
    console.error("Error liking ad:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to like ad");
  }
};

export const unlikeAd = async (adId: string, userId: string) => {
  try {
    const response = await apiClient.delete(`/user/unlike-ad`, {
      data: {
        userId: userId,
        adId: adId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error unliking ad:", error.message || error);
    throw new Error(error.response?.data?.message || "Failed to unlike ad");
  }
};

export const getLikedAds = async (user_id: string) => {
  try {
    const response = await apiClient.post("/user/liked-ads", {
      user_id: user_id,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching liked ads:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch liked ads"
    );
  }
};

export const getUserLikedAdIds = async (user_id: string) => {
  try {
    const response = await apiClient.post("/user/liked-ad-ids", {
      user_id: user_id,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching liked ads:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch liked ads"
    );
  }
};
