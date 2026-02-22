import { getBookById } from "@/app/actions";
import { getToken } from "@/app/lib/cookie";
import { Header } from "@/app/ui";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  const token = await getToken();

  if (!book) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Header loggedIn={!!token} />
      <main className="w-full max-w-4xl flex-grow p-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="flex h-96 items-center justify-center rounded-lg bg-gray-200 shadow-lg dark:bg-zinc-800">
              <span className="text-gray-500">Book Image Placeholder</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
              {book.name}
            </h1>
            <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
              {book.description}
            </p>
            <div className="mb-8 flex items-center justify-between">
              <span className="text-4xl font-bold text-blue-600">
                ${(book.price / 100).toFixed(2)}
              </span>
            </div>
            <button className="w-full rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-zinc-200 py-6 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Microverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
