import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Order } from "@/lib/data/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface OrderProps {
  order: Order;
}

export function OrderCard({ order }: OrderProps) {
  console.log(order);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{order.id}</CardTitle>
        <CardDescription>Order details</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Customer</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center h-8 w-8  bg-slate-200  rounded-full">
              <Avatar>
                <AvatarImage
                  src="/images/avatar.jpg"
                  className="rounded-full"
                />
                <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">
                {order.customer}
              </p>
              {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Total</h4>
            <p className="text-sm text-muted-foreground">{`₽${order.total}`}</p>
          </div>

          <div className="flex justify-between">
            <h4 className="text-sm font-medium">Item(s)</h4>
            <p className="text-sm text-muted-foreground">{`${order.items
              .map((i) => i.units)
              .reduce((c, r) => c + r)}`}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between mt-8">
            <h4 className="text-sm font-medium">Item</h4>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          {order.items.map((item) => {
            var title = item.product?.title ?? "";
            var total = (item.product?.price ?? 1) * item.units;
            return (
              <div key={item.id} className="flex justify-between">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{`₽${total}`}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
