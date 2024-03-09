import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  box_state: false,
};

export const fetchCartData = createAsyncThunk(
  "cart/fetchData",
  async (data) => {
    //console.log(data.email);
    const response = await axios.get("/api/cart", {
      params: {
        email: data.email,
      },
    });
    //console.log("res ", response);
    if (response.data.cart_items) {
      return response.data.cart_items;
    }

    return [];
  }
);

export const refetchCartData = createAsyncThunk(
  "cart/refetchData",
  async (params, { dispatch, getState }) => {
    try {
      const box_state = getState().cart.box_state;
      dispatch(fetchCartData({ email: params.email }));
      if (!box_state) dispatch(toggleBox());
    } catch (error) {
      throw new Error("Error refetching cart data");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleBox(state, action) {
      // if (state.box_state === "hidden") state.box_state === "appear";
      // else state.box_state === "hidden";\
      state.box_state = !state.box_state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("error");
      });
  },
});

export const { toggleBox } = cartSlice.actions;

export default cartSlice.reducer;
