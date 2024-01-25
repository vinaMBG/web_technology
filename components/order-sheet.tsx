"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrderForm } from "./order-form";
import { Order, Product } from "@/lib/data/interfaces";
import { ReactNode, useState } from "react";
import { boolean } from "zod";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface OrderSheetProps {
  children: ReactNode;
  //   products: Product[];
  order?: Order;
  //   onRefresh: () => void;
}
export function OrderSheet({
  children,
  //   products,
  order,
}: //   onRefresh,
OrderSheetProps) {
  const products = useSelector((state: any): Product[] => state.products);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onSuccess() {
    setOpen(false);
    // router.refresh();
    // onRefresh();
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>New order</SheetTitle>
          <SheetDescription>
            The newly added order will be stored in the firebase database and
            deleted once it&apos;s date has passed.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <OrderForm  onSuccess={onSuccess} order={order} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
