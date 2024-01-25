"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "./order-table";
import { Order, Product, Sales } from "@/lib/data/interfaces";
import { OrderCard } from "./order-card";

import { useDispatch } from "react-redux";
import { setOrders } from "@/lib/reducers/orders";
import { setProducts } from "@/lib/reducers/products";
import { setSales } from "@/lib/reducers/sales";

interface MainContentProps {
  orders: Order[];
  products: Product[];
  sales?: Sales;
}

export function MainContent({ orders, products, sales }: MainContentProps) {
  const [order, setOrder] = useState<Order>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrders(orders));
    dispatch(setProducts(products));
    if (sales) dispatch(setSales(sales));
  });
  return (
    <div className="flex my-4 mx-4 space-x-2 items-stretch">
      <div className={`flex-1 ${order ? "basis-3/4" : ""}`}>
        <OrdersTable onDetailOrder={setOrder} />
      </div>
      {!order ? undefined : (
        <div className="flex basis-1/4">
          <OrderCard order={order} />
        </div>
      )}
    </div>
  );
}
