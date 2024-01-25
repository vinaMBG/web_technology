import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../data/interfaces";

const initialState: Order = {
  id: "",
  customer: "",
  date: new Date(),
  total: 0,
//   number: "",
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, orders: PayloadAction<Order>) => (state = orders.payload),
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
