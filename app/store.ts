import { configureStore } from "@reduxjs/toolkit";

import OrdersReducer from "@/lib/reducers/orders";
import OrderReducer from "@/lib/reducers/view-order";
import products from "@/lib/reducers/products";
import sales from "@/lib/reducers/sales";
const store = configureStore({
  reducer: {
    orders: OrdersReducer,
    order: OrderReducer,
    products,
    sales,
  },
});
export default store;
