import { Order, OrderItem, Product, Sales } from "@/lib/data/interfaces";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { OrderItems } from "@/components/order-items";
import { deleteOrder } from "./actions";

enum Collections {
  orders,
  products,
}

export function getId() {
  return `EL${Date.now()}`;
  //   return getOrders().then((order) => `EL${Date.now()}`);
}

export async function getOrdersByDate(expired: string[]) {
  try {
    expired.forEach((e) => {
      deleteOrder(e).catch();
    });
  } catch (e) {}
}

export async function getOrders(reload = false): Promise<Order[]> {
  try {
    const docRef = await getDocs(collection(db, "orders"));
    var items = docRef.docs.map((doc): Order => {
      return {
        date: new Date(doc.get("date")),
        customer: doc.get("customer") as string,
        id: doc.id,
        items: doc.get("items") as OrderItem[],
        // number: doc.get("number") as string,
        total: doc.get("total") as number,
      };
    });

    const i = items.filter((e) => e.date.getTime() > Date.now());
    items
      .filter((e) => e.date.getTime() < Date.now())
      .forEach((e) => {
        deleteOrder(e.id);
      });
    return i;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return [];
}

export async function getProdcts(): Promise<Product[]> {
  try {
    const docRef = await getDocs(collection(db, "products"));

    return docRef.docs.map((doc): Product => {
      return {
        title: doc.get("title") as string,
        id: doc.id,
        quantity: doc.get("quantity") as number,
        price: doc.get("price") as number,
      };
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return [];
}

export async function getSale(): Promise<Sales | undefined> {
  try {
    const d = await getDoc(doc(db, "sales", "sales"));

    return {
      orders: d.get("orders") as number,
      units: d.get("units") as number,
      total: d.get("total") as number,
    };
  } catch (e) {
    console.error("Error adding document: ", e);

    return undefined;
  }
}
