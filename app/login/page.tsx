"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/actions";
import Link from "next/link";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-zinc-900">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" action={dispatch}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <LoginButton />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage.message}</p>
          )}
          <div className="text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}
