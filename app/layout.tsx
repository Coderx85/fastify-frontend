import type { Metadata } from "next";
import { Geist_Mono as GeistMono } from "next/font/google";
import { CartProvider } from "./context/cart-context";
import Cart from "../components/ui/cart";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body
        className={` ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Cart />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
