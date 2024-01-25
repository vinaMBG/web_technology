"use client";

import { MdDeleteOutline } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./ui/button";

import { OrderItem } from "@/lib/data/interfaces";
import { Input } from "./ui/input";

interface PropsInterface {
  items: OrderItem[];
  onRemove: (item: OrderItem) => void;
  onItemChanged: (item: OrderItem, units: number) => void;
}

export function OrderItems({ items, onRemove, onItemChanged }: PropsInterface) {
  return (
    <div className="space-y-4 h-full ">
      <Table>
        <TableCaption>A list of order items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[24px]">№</TableHead>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Units</TableHead>

            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {items.indexOf(item) + 1}
              </TableCell>
              <TableCell>{item.product?.title}</TableCell>
              <TableCell>{`${item.product?.price}₽`}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  defaultValue={`${item.units}`}
                  min={1}
                  max={item.product?.quantity ?? 100}
                  onChange={(e) => {
                    onItemChanged.call(
                      undefined,
                      item,
                      Number(e.target.value) ?? 1
                    );
                  }}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove.call(undefined, item);
                  }}
                >
                  <MdDeleteOutline />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
