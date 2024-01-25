import { db } from "@/lib/firebase/config";
import { addDoc, setDoc, getDocs, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
type ResponseData = {
  message: string;
};

export async function POST(req: NextApiRequest) {
  try {
    const docRef = await addDoc(collection(db, "orders"), req.body);

    return Response.json({ id: docRef.id });
  } catch (e) {
    console.error("Error adding document: ", e);
    return Response.error();
  }
}

export async function GET(req: NextApiRequest) {
  try {
    const docRef = await getDocs(collection(db, "orders"));

    return Response.json(docRef.docs.map((e) => e.data));
  } catch (e) {
    console.error("Error adding document: ", e);
    return Response.error();
  }
}
