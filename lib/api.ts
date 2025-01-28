import apiClient from "@/services/api-client";

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

export const fetchUserAds = async (username: string) => {
  try {
    const response = await apiClient.post("/uploads/user-ads", {
      owner_username: username,
    });

    return response.data.ads;
  } catch (error: any) {
    if (
      error.response?.data?.error === "User not Authenticated!" ||
      error.response?.data?.error === "Invalid token!"
    ) {
      // Throw a specific error for authentication issues
      throw new Error("AUTHENTICATION_ERROR");
    }

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
