"use client";

import { useCart } from "@/app/context/cart-context";
import { Product } from "@/app/lib/definitions";
import { Button } from "./button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Button
      variant="default"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        addToCart(product);
      }}
    >
      Add to Cart
    </Button>
  );
}
