"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createOrderAndProceedToPayment } from "@/app/actions";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  // result may either be an error message or payment data (when razorpay is used)
  const [result, dispatch] = useFormState<any>(
    createOrderAndProceedToPayment as any,
    undefined,
  );

  // when the server action returns paymentInfo from the razorpay route, open
  // the Razorpay checkout widget on the client
  React.useEffect(() => {
    if (result && "paymentInfo" in result) {
      const info = result.paymentInfo as any;
      const order = info.order;
      const keyId = info.keyId;
      const successUrl: string = info.successUrl;

      // dynamically load the Razorpay script if not already present
      if (
        !document.querySelector(
          "script[src='https://checkout.razorpay.com/v1/checkout.js']",
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          const options = {
            key: keyId,
            order_id: order.id,
            handler: function (response: any) {
              window.location.href = successUrl;
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
      } else {
        const options = {
          key: keyId,
          order_id: order.id,
          handler: function (response: any) {
            window.location.href = successUrl;
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    }
  }, [result]);

  if (cartItems.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl">Your Cart is Empty</h1>
        <p className="mb-8">
          Add some items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Shipping Information</h2>
          <form action={dispatch}>
            <input
              type="hidden"
              name="cartItems"
              value={JSON.stringify(
                cartItems.map((item) => ({
                  productId: item.id,
                  quantity: item.quantity,
                })),
              )}
            />
            <div className="mb-4">
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Address
              </label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                rows={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Order Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <SubmitButton />
            {result && "message" in result && (
              <p className="mt-2 text-sm text-red-500">{result.message}</p>
            )}
          </form>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Your Order</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-green-600 px-4 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
    >
      {pending ? "Processing..." : "Place Order & Pay"}
    </button>
  );
}
