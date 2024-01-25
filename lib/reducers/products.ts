import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, Product } from "../data/interfaces";

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, products: PayloadAction<Product[]>) =>
      (state = products.payload),
    addProduct: (state, product: PayloadAction<Product>) => {
      state.push(product.payload);
    },
    removeProduct: (state, product: PayloadAction<Product>) => {
      state = state.filter((e) => e.id !== product.payload.id);
      return state;
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
