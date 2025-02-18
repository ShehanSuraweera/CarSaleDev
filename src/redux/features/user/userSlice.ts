// src/redux/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, Session } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import {
  getUserProfileData,
  updateUserProfile as apiUpdateUserProfile,
} from "@/src/lib/api";
import { UserProfileData } from "@/src/types";

// Supabase client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface UserState {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  session: null,
  profile: null,
  loading: true,
};

// **Fetch user profile**
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const profileData: UserProfileData = await getUserProfileData(userId);
      return profileData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user profile");
    }
  }
);

// **Update user profile**
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiUpdateUserProfile(formData);
      if (response === "Profile updated") {
        return await getUserProfileData(formData.get("user_id") as string);
      } else {
        return rejectWithValue("Failed to update profile");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred while updating the profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { setUser, setSession, setLoading } = userSlice.actions;
export default userSlice.reducer;
