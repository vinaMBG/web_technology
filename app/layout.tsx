import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "./ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elvina TRVP-009",
  description:
    "Homework for the course “Web Application Development Technologies”",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
