import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../data/interfaces";

const initialState: Order[] = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, orders: PayloadAction<Order[]>) =>
      (state = orders.payload),
    addOrder: (state, order: PayloadAction<Order>) => {
      state.push(order.payload);
    },
    removeOrder: (state, order: PayloadAction<Order>) => {
      state = state.filter((e) => e.id !== order.payload.id);
      return state;
    },
    deleteManyBy: (state, date: PayloadAction<Date>):Order[] => {
    
      state = state.filter((e) => e.date.getTime() >= date.payload.getTime());
      return state;
    },
  },
});

export const { setOrders, addOrder,removeOrder,deleteManyBy } = ordersSlice.actions;
export default ordersSlice.reducer;
