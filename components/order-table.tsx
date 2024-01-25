import { TableHeader as Header } from "./table-header";
import { IoIosMore } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

import { Order, Product } from "@/lib/data/interfaces";
import { OrderSheet } from "./order-sheet";
import { useRouter } from "next/navigation";
import { deleteOrder } from "@/lib/firebase/actions";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder } from "@/lib/reducers/orders";

interface OrdersProps {
  // orders: Order[];
  // products: Product[];
  onDetailOrder: Function;
}

export function OrdersTable({ onDetailOrder }: OrdersProps) {
  const orders = useSelector((state: any): Order[] => state.orders);
  const dispatch = useDispatch();
  async function onDeleteOrder(order: Order) {
    dispatch(removeOrder(order));
    await deleteOrder(order.id);
  }

  return (
    <div className="space-y-4 h-full rounded-xl border-solid border p-4 ">
      <Header />
      <Table>
        <TableCaption>A list of your available orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Item(s)</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} onClick={onDetailOrder.bind(null, order)}>
              <TableCell className="font-medium">{`#${order.id}`}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{`${order.date.toDateString()}`}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell className="text-right">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <IoIosMore />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Postions</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOrder.call(undefined, order);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <OrderSheet order={order}>
                    <Button>
                      <CiEdit />
                    </Button>
                  </OrderSheet>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}
