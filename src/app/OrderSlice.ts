import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { toast } from "react-toastify";

export interface rder {
 id: string;
 items: Record<string, number>;
}

interface OrderState {

}

const initialState: OrderState = {

};

export const fetchOrders = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axiosApi.get(`/admin/orders.json`);

  const data = response.data;
  if (!data) {
    return [];
  }
  const result = Object.keys(data).map((id) => {
    return {
      id,
      ...data,
    };
  });
  console.log("result", result);

  return result;
});

const cartSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  },
});

export const orderReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
