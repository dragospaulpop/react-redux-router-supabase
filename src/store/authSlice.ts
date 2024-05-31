import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase";

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

export enum AuthStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: AuthStatus.idle,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }

    return true;
  },
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }

    const { data: user } = await supabase
      .from("users")
      .select("id, username, email, role")
      .eq("id", data!.user!.id)
      .single();

    return user;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signup.pending, (state) => {
      state.status = AuthStatus.loading;
      state.error = null;
    });

    builder.addCase(signup.fulfilled, (state) => {
      state.status = AuthStatus.succeeded;
    });

    builder.addCase(signup.rejected, (state, { payload }) => {
      state.status = AuthStatus.failed;
      state.error = payload as string;
    });

    builder.addCase(signin.pending, (state) => {
      state.status = AuthStatus.loading;
      state.error = null;
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      state.status = AuthStatus.succeeded;
      state.user = action.payload;
    });

    builder.addCase(signin.rejected, (state, { payload }) => {
      state.status = AuthStatus.failed;
      state.error = payload as string;
    });
  },
});

export default authSlice.reducer;
