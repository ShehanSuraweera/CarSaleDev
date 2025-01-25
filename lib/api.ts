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

export const fetchTrendingAds = async (make: string) => {
  try {
    const response = await apiClient.post("/uploads/trending-ads", {
      make: make,
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
