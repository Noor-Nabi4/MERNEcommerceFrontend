import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUser,
  fetcLoggedInUserOrders,
} from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};
export const fetcLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetcLoggedInUserOrders",
  async (userId) => {
    const response = await fetcLoggedInUserOrders(userId);
    return response.data;
  }
);
export const UpdateUserAsync = createAsyncThunk(
  "user/UpdateUser",
  async (update) => {
    const response = await UpdateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: "user",
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
      .addCase(fetcLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default orderSlice.reducer;
