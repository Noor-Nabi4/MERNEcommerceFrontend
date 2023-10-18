import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, createUser, signOut,CheckAuth } from "./authAPI";

const initialState = {
  checkUser : false,
  status: "idle",
  loggedInUser: null,
  error: null,
};
export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginInfo =null, { rejectWithValue }) => {
    try {
      const response = await login(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  "auth/check",
  async () => {
    try {
      const response = await CheckAuth();
      return response.data;
    } catch (error) {
    }
  }
);
export const signOutAsync = createAsyncThunk("auth/signOut", async (userId) => {
  const response = await signOut(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.checkUser = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.checkUser = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectcheckAuth = (state) => state.auth.checkUser;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
