import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { toast } from "react-toastify";

export interface Dish {
  id: string
  title: string
  price: string
  url: string
};

interface DishesState {
  dishes: Dish [],
  loading: boolean;
}

const initialState: DishesState = {
  dishes: [],
  loading: false
};

export const fetchDishes = createAsyncThunk("dishes/fetchAll", async () => {
  const response = await axiosApi.get<Record<string, Dish>>(
    "/admin/dishes.json"
  );
  const data = response.data;

  if (!data) {
    return [];
  }

  const result = Object.keys(data).map((id) => {
    return {
      id,
      ...data[id],
    };
  });
  return result;
});

export const deleteDishes = createAsyncThunk(
  "dishes/deleteDishes",
  async (id: string) => {
    await axiosApi.delete(`/admin/dishes/${id}.json`);
    return id;
  }
);

export const addDish = createAsyncThunk(
  "dish/addDish",
  async (dish: Omit<Dish, "id">) => {
    await axiosApi.post(`/admin/dishes.json`, dish);
    return dish;
  }
);

export const editDish = createAsyncThunk(
  "dish/editDish",
  async (dish: Dish) => {
    const { id, ...dishData } = dish;

    await axiosApi.put(`/admin/dishes/${id}.json`, dishData);

    return dish;
  }
);

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteDishes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDishes.fulfilled, (state, action) => {
      state.dishes = state.dishes.filter((c) => c.id !== action.payload);
      state.loading = false;
      toast.info("Success deleted");
    });
    builder.addCase(deleteDishes.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
    builder.addCase(addDish.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addDish.fulfilled, (state) => {
      state.loading = false;
      toast.success("Dish added");
    });
    builder.addCase(addDish.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
    builder.addCase(editDish.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editDish.fulfilled, (state, action) => {
      state.loading = false;

      state.dishes = state.dishes.map((dish) =>
        dish.id === action.payload.id ? action.payload : dish
      );

      toast.success("Dish updated");
    });
    builder.addCase(editDish.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  }
});

export const dishesReducer = dishesSlice.reducer;
export const {} = dishesSlice.actions;
