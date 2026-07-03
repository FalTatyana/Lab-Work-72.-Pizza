import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Dish } from "./DishesSlice";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  url: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
});

export const cartReducer = cartSlice.reducer;
export const {addToCart} = cartSlice.actions;
