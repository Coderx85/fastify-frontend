import type { Metadata } from "next";
import { Geist_Mono as GeistMono } from "next/font/google";
import { CartProvider } from "./context/cart-context";
import Cart from "./ui/cart";
import "./globals.css";

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Microverse",
  description: "A modern e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Cart />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
