// features/user/userSlice.ts
import { createSupabaseClient } from "@/src/auth/client";
import { getUserProfileData } from "@/src/lib/api";
import { UserProfileData } from "@/src/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, Session } from "@supabase/supabase-js";

// Define the initial state
interface UserState {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  session: null,
  profile: null,
  loading: false,
  error: null,
};

// Create Supabase client
const supabaseBrowserClient = createSupabaseClient();

// Async thunk to fetch user session
export const fetchUserSession = createAsyncThunk(
  "user/fetchSession",
  async () => {
    const { data } = await supabaseBrowserClient.auth.getSession();
    return data.session;
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string) => {
    const profileData = await getUserProfileData(userId);
    return profileData;
  }
);

// Async thunk to handle login with email and password
export const loginWithEmailPassword = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const { data, error } =
        await supabaseBrowserClient.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw new Error(error.message);

      // Fetch profile after successful login
      if (data.user) {
        dispatch(fetchUserProfile(data.user.id));
      }

      return data;
    } catch (error) {
      return (error as Error).message;
    }
  }
);

// Async thunk to handle Google login
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token: string, { dispatch }) => {
    try {
      const { data, error } =
        await supabaseBrowserClient.auth.signInWithIdToken({
          provider: "google",
          token,
        });

      if (error) throw new Error(error.message);

      // Fetch profile after successful login
      if (data.user) {
        dispatch(fetchUserProfile(data.user.id));
      }

      return data;
    } catch (error) {
      return (error as Error).message;
    }
  }
);

// Create the user slice
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
    setProfile: (state, action: PayloadAction<UserProfileData | null>) => {
      state.profile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserSession
      .addCase(fetchUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.session = action.payload;
        state.user = action.payload?.user ?? null;
        state.loading = false;
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch session";
        state.loading = false;
      })

      // Handle fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch profile";
        state.loading = false;
      })

      // Handle loginWithEmailPassword
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        if (typeof action.payload !== "string") {
          state.session = action.payload.session;
          state.user = action.payload.user;
        }
        state.loading = false;
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      })

      // Handle loginWithGoogle
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        if (typeof action.payload !== "string") {
          state.session = action.payload.session;
          state.user = action.payload.user;
        }
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.error.message || "Google login failed";
        state.loading = false;
      });
  },
});

// Export actions
export const { setUser, setSession, setProfile, setLoading, clearUser } =
  userSlice.actions;

// Export reducer
export default userSlice.reducer;
