import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Sales } from "../data/interfaces";

const initialState: Sales = {
  units: 100,
  total: 1000,
  orders: 100,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, sales: PayloadAction<Sales>) =>
      (state = sales.payload),
    
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
