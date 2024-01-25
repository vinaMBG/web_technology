"use server";
import { db } from "@/lib/firebase/config";
import { set } from "date-fns";
import {
  addDoc,
  setDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getId, getOrders } from "./orders";
type ResponseData = {
  message: string;
};

interface AddOrUpdateProps {
  data: any;
  id: string;
}

export async function addOrUpdateOrder(
  data: string,
  id?: string
): Promise<boolean> {
  try {
    id = id ?? (await getId());

    await setDoc(doc(db, "orders", id), JSON.parse(data));
    await getOrders(true);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function deleteOrder(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "orders", id));

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function updateSales(data:string): Promise<boolean> {
    try {
      await setDoc(doc(db, "sales", "sales"), JSON.parse(data));
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
}
