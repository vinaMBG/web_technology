"use client";

import * as React from "react";
import { SlCalender as CalendarIcon } from "react-icons/sl";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getOrdersByDate } from "@/lib/firebase/orders";

import { useDispatch, useSelector } from "react-redux";
import { deleteManyBy } from "@/lib/reducers/orders";
import { Order, Sales } from "@/lib/data/interfaces";
import { setSales } from "@/lib/reducers/sales";
import { updateSales } from "@/lib/firebase/actions";

interface Reducerss {
  sales: Sales;
  orders: Order[];
}

export function CalendarDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { orders, sales } = useSelector((state: any): Reducerss => {
    return { orders: state.orders, sales: state.sales };
  });

  const dispatch = useDispatch();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  async function onDateChanged(date?: Date) {
    if (!date) return;
    setDate(date);
    const s={...sales};

    let expired = orders
      .filter((e) => e.date.getTime() < date.getTime())
      .map((e) => {
        s.orders++;
        s.total += e.items
          .map((i) => {
            let price = i.product?.price ?? 1;
            return Number(i.units) * price;
          })
          .reduce((i, c) => i + c);
        s.units += e.items
          .map((i) => Number(i.units))
          .reduce((i, c) => i + c);
        return e.id;
      });
    dispatch(setSales(s));
    dispatch(deleteManyBy(date));
    await getOrdersByDate(expired);
    await updateSales(JSON.stringify(s));
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "LLL dd, y") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            disabled={(date) => date < new Date()}
            selected={date}
            onSelect={(date) => onDateChanged.call(undefined, date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
