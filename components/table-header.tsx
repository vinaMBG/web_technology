import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdAdd } from "react-icons/io";

import { Product } from "@/lib/data/interfaces";

import { OrderSheet } from "./order-sheet";

interface TableHeaderProps {
  // products: Product[];
  onRefresh: () => void;
}

export function TableHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input placeholder="Search orders" className="max-w-96" />
      </div>
      <div>
        <OrderSheet>
          <Button>
            <IoMdAdd className="mr-2 h-4 w-4" /> New Order
          </Button>
        </OrderSheet>
      </div>
    </div>
  );
}
