import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItmstByUserId,
  deleteCartItem,
  updateCartItem,
  resetCart,
} from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCartItmstByUserIdAsync = createAsyncThunk(
  "cart/Items",
  async (userId) => {
    const response = await fetchCartItmstByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItems",
  async (update) => {
    const response = await updateCartItem(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
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
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartItmstByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItmstByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
