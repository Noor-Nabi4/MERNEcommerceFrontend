import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CheckUser,
  UpdateUser,
  fetcLoggedInUserOrders,
} from "./userAPI";

const initialState = {
  checkUser : false,
  userOrders: [],
  userInfo:null,
  status: "idle",
};
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
  /* extraReducers: (builder) => {
    builder;
  }, */
});

export default orderSlice.reducer;
