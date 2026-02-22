import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center dark:bg-black">
      <div className="rounded-lg bg-white p-10 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Checkout Cancelled
        </h1>
        <p className="mb-8 text-lg">
          Your checkout process was cancelled. You can continue shopping and try
          again.
        </p>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
