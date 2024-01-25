import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import { CalendarDatePicker } from "./date-picker";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex items-center justify-between space-y-2 w-full mt-10">
      <div>
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your orders
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarDatePicker />
        <UserNav />
      </div>
    </div>
  );
}
