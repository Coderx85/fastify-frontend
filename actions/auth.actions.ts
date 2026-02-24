"use server";

import { AuthProps } from "@/types/auth";
import { setToken, deleteToken, getToken } from "@/lib/cookie";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState:
    | {
        message: string;
      }
    | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  try {
    const res = await fetch(`${config.BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!json.ok) {
      return { message: json.message || "Login failed." };
    }

    const tokenData = json.data.token;
    if (!tokenData) {
      return { message: "Login failed: No token received." };
    }

    await setToken(tokenData);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "An error occurred during login." };
  }
  redirect("/");
}
