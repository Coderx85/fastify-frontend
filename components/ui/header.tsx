"use client";

import Link from "next/link";
import { logout } from "@/app/actions";
import { useCart } from "@/app/context/cart-context";
import { Button } from "./button";

export default function Header({ loggedIn }: { loggedIn: boolean }) {
  const { cartItems, openCart } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full border-b from-zinc-600 to-white/85 border-zinc-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-secondary">
          Microverse
          <span className="pl-1 text-2xl rounded-2xl font-extrabold text-gray-500">
            {"."}
          </span>
        </Link>
        <div className="flex items-center">
          {loggedIn ? (
            <form action={logout}>
              <Button
                variant="ghost"
                size="default"
                className="ml-2"
                type="submit"
              >
                Logout
              </Button>
            </form>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="default">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="default" className="ml-2">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="outline"
            className="ml-4 flex items-center"
            onClick={openCart}
          >
            Cart ({totalItems})
          </Button>
        </div>
      </nav>
    </header>
  );
}
