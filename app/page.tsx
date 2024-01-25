import { MainNav } from "@/components/main-nav";

import { MainContent } from "@/components/main-content";
import { getOrders, getProdcts, getSale } from "@/lib/firebase/orders";
import { Overview } from "@/components/recent-sales";

export default async function Home() {
  const products = await getProdcts();
  const orders = await getOrders();
  const sales = await getSale();
  return (
    <main className="flex flex-col">
      <div className="flex h-16 items-center px-4 w-full">
        <MainNav />
      </div>
      <Overview />
      <MainContent orders={orders} products={products} sales={sales} />
    </main>
  );
}
