"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SlCalender as CalendarIcon } from "react-icons/sl";
import { BsCheckSquare as CheckIcon } from "react-icons/bs";
import { RxCaretSort as CaretSortIcon } from "react-icons/rx";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Toaster } from "@/components/ui/sonner";
import { OrderItems } from "./order-items";

import { useEffect, useState } from "react";
import { Order, OrderItem, Product } from "@/lib/data/interfaces";
import { addOrUpdateOrder } from "@/lib/firebase/actions";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { getId } from "@/lib/firebase/orders";
import { addOrder } from "@/lib/reducers/orders";
const orderFormSchema = z.object({
  customer: z
    .string()
    .min(2, {
      message: "Customer name must be at least 2 characters.",
    })
    .max(30, {
      message: "Customer name must not be longer than 30 characters.",
    }),
  date: z.date({
    required_error: "An order date is required.",
  }),
  items: z.string({
    required_error: "Please add order items.",
  }),
});

type AccountFormValues = z.infer<typeof orderFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

interface OrderFormProps {
  // products: Product[];
  onSuccess: () => void;
  order?: Order;
}

export function OrderForm({ onSuccess, order }: OrderFormProps) {
  const products = useSelector((state: any): Product[] => state.products);
  const dispatch = useDispatch();
  const [items, setItems] = useState<OrderItem[]>(order?.items ?? []);
  const [alertMsg, setAlertMsg] = useState<string>();

  function remove(item: OrderItem) {
    console.log(item);
    setItems(items.filter((i) => i.id !== item.id));
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customer: order?.customer,
      date: order?.date,
      items: items[0]?.product?.title,
    },
  });

  function onUnitsChanged(item: OrderItem, units: number) {
    const qty = item.product?.quantity ?? 1;

    if (qty >= units) {
      item.units = units;
      if (alertMsg) setAlertMsg(undefined);
      return;
    }
    setAlertMsg(
      `The ${
        item.product?.title ?? ""
      } is now out of stock!\nPlease enter units not more than ${qty}`
    );
  }

  async function onSubmit(data: AccountFormValues) {
    const order: Order = {
      id: getId(),
      customer: data.customer,
      date: data.date,
      items,
      total: items
        .map((e) => Number(e.units) * Number(e.product?.price))
        .reduce((e, v) => e + v),
    };
    const success = await addOrUpdateOrder(JSON.stringify(order), order?.id);
    if (success) {
      onSuccess.call(undefined);
      dispatch(addOrder(order));
      toast("You submitted the following values:");
    }

    toast("an error occurred");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row space-x-4 w-full">
          <div className="flex flex-col space-y-4 basis-1/2">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="customer name"
                      {...field}
                      defaultValue={order?.customer}
                      disabled={order !== undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your order
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Order Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date of delivery of the order
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col basis-1/2 rounded-xl border-solid border p-4 space-y-4">
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Order Items</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? products.find(
                                (product) => product.title === field.value
                              )?.title
                            : "Select product"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search product..." />
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              value={product.title}
                              key={product.id}
                              onSelect={() => {
                                form.setValue("items", product.title);
                                let item = items.find(
                                  (e) => e.id == product.id
                                );
                                if (!item) {
                                  setItems([
                                    ...items,
                                    {
                                      id: product.id,
                                      units: 1,
                                      product: product,
                                    },
                                  ]);
                                }
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  product.title === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {product.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    These products are your order items.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <OrderItems
              items={items}
              onRemove={remove}
              onItemChanged={onUnitsChanged}
            />
            {!alertMsg ? undefined : (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>{alertMsg}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <Button type="submit">Save Order</Button>
      </form>
    </Form>
  );
}
