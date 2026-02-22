import { cookies } from "next/headers";

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();

  return cookieStore.get("token")?.value || null;
}

export async function setToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function deleteToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
