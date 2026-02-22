"use client";

import { useCart } from "@/app/context/cart-context";
import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent } from "./card";

export default function Cart() {
  const { cartItems, isCartOpen, closeCart } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed top-0 right-0 z-20 h-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-zinc-900 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "400px" }}
    >
      <div className="flex h-full flex-col p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            &times;
          </Button>
        </div>
        {cartItems.length === 0 ? (
          <p className="grow">Your cart is empty.</p>
        ) : (
          <div className="grow overflow-y-auto">
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="mb-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-zinc-500">
                      ${(item.price / 100).toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-auto border-t pt-6">
            <div className="mb-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="w-full">
              <Button className="w-full" variant="default">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
