import Link from "next/link";
import { Product } from "@/app/lib/definitions";
import AddToCartButton from "./add-to-cart-button";
import { Card, CardContent } from "./card";

export default function BookCard({ book }: { book: Product }) {
  return (
    <Card className="flex h-full flex-col justify-between transform transition-transform duration-300 hover:scale-105">
      <Link href={`/books/${book.id}`} className="flex flex-col h-full">
        <CardContent className="grow">
          <h2 className="mb-2 text-xl font-semibold">{book.name}</h2>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            {book.description}
          </p>
        </CardContent>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${(book.price / 100).toFixed(2)}
          </span>
          <AddToCartButton product={book} />
        </div>
      </Link>
    </Card>
  );
}
