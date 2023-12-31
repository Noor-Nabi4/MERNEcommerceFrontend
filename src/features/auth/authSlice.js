import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, createUser, signOut,CheckAuth, UpdateAuth, fetchAuthOrders } from "./authAPI";

const initialState = {
  checkAuth : false,
  status: "idle",
  authInfo: null,
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
export const UpdateAuthAsync = createAsyncThunk(
  "auth/Update",
  async (update) => {
    const response = await UpdateAuth(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAuthOrdersAsync = createAsyncThunk(
  "auth/Orders",
  async () => {
    const response = await fetchAuthOrders();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        state.authInfo = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload;
        state.checkAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.checkAuth = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = null;
      })
      .addCase(fetchAuthOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(UpdateAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload;
      });
  },
});
export const selectAuthInfo = (state) => state.auth.authInfo;
export const selectAuthOrders = (state) => state.auth.userOrders;
export const selectcheckAuth = (state) => state.auth.checkAuth;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
