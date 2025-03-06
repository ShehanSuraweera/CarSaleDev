import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLikedAdIds } from "@/src/lib/api";
import { RootState } from "../../store";

interface LikedAdsState {
  likedAds: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LikedAdsState = {
  likedAds: [],
  status: "idle",
  error: null,
};

// Fetch only user's liked ads
export const fetchUserLikedAdIds = createAsyncThunk(
  "likedAds/fetchUserLikedAds",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) {
      return rejectWithValue("User not logged in");
    }
    try {
      const likedAds = await getUserLikedAdIds(userId);
      if (!likedAds) {
        throw new Error("No liked ads found");
      }
      // Extract only the `ad_id` values
      const adIds = likedAds.likedAds.map((ad: { ad_id: string }) => ad.ad_id);
      return adIds;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch liked ads"
      );
    }
  }
);

const likedAdsSlice = createSlice({
  name: "likedAds",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const adIds = action.payload;
      if (state.likedAds.includes(adIds)) {
        state.likedAds = state.likedAds.filter((id) => id !== adIds);
      } else {
        state.likedAds.push(adIds);
      }
    },
    resetAdIds: (state) => {
      state.likedAds = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLikedAdIds.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserLikedAdIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedAds = action.payload;
      })
      .addCase(fetchUserLikedAdIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { toggleLike, resetAdIds } = likedAdsSlice.actions;
export default likedAdsSlice.reducer;
