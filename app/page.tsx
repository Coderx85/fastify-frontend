import { getBooks } from "./actions";
import { Product } from "./lib/definitions";
import { cookies } from "next/headers";
import { Header, BookCard } from "./ui";

export default async function Home() {
  const books = await getBooks();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Header loggedIn={!!token} />
      <main className="w-full max-w-7xl p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Welcome to the Book Store
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.length > 0 ? (
            books.map((book: Product) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-zinc-500">
                No books available at the moment.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Please check back later.
              </p>
            </div>
          )}
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
