import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Dish } from "./DishesSlice";
import axiosApi from "../axiosApi";
import { toast } from "react-toastify";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  url: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
};

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (items: CartItem[]) => {
    const order = items.reduce((acc, item) => {
      acc[item.id] = item.amount;
      return acc;
    }, {} as Record<string, number>);
    await axiosApi.post(`/orders.json`, order);
    return;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addToCart(state, action: PayloadAction<Dish>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.amount++;
      } else {
        state.items.push({
          ...action.payload,
          amount: 1,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postOrder.fulfilled, (state) => {
      state.loading = false;
      state.items = [];
      toast.success("Order created");
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
