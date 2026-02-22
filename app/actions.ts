"use server";

import { deleteToken, getToken, setToken } from "./lib/cookie";
import { ApiResponse, Product } from "./lib/definitions";
import { redirect } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function getBooks(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, { cache: "no-store" });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Failed to fetch books:", res.status, errorBody);
      throw new Error(`Failed to fetch books. Status: ${res.status}`);
    }
    const json: ApiResponse<{ products: Product[] }> = await res.json();
    if (!json.ok) {
      throw new Error(json.message || "Failed to fetch books");
    }
    return json.data.products;
  } catch (error) {
    console.error("API Error fetching books:", error);
    return [];
  }
}

export async function getBookById(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch book");
    }
    const json: ApiResponse<{ product: Product }> = await res.json();
    if (!json.ok) {
      throw new Error(json.message || "Failed to fetch book");
    }
    return json.data.product;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export async function login(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
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

export async function register(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { message: "Name, email and password are required." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();

    if (!json.ok) {
      return { message: json.message || "Registration failed." };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "An error occurred during registration." };
  }
  redirect("/login");
}

export async function logout() {
  await deleteToken();
  redirect("/");
}

export async function createOrderAndProceedToPayment(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const token = await getToken();
  if (!token) {
    return redirect("/login");
  }

  const cartItemsJSON = formData.get("cartItems") as string;
  const shippingAddress = formData.get("shippingAddress") as string;
  const notes = formData.get("notes") as string;

  if (!cartItemsJSON || !shippingAddress) {
    return { message: "Cart items and shipping address are required." };
  }

  let cartItems;
  try {
    cartItems = JSON.parse(cartItemsJSON);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { message: "Invalid cart items." };
    }
  } catch (error) {
    return { message: "Invalid cart items format." };
  }

  try {
    // 1. Create Order
    // decode token to pull user ID (for debug or to satisfy older APIs)
    let userId: number | undefined;
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(
          Buffer.from(parts[1], "base64").toString("utf8"),
        );
        if (payload && typeof payload === "object" && "id" in payload) {
          userId = payload.id as number;
        }
      }
    } catch {}

    const bodyPayload: any = {
      products: cartItems,
      shippingAddress,
      notes,
    };
    if (userId !== undefined) {
      bodyPayload.userId = userId;
    }

    const orderRes = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyPayload),
    });

    const orderJson = await orderRes.json();
    console.log("Order creation response:", orderJson);
    if (!orderJson.ok) {
      return { message: `Failed to create order: ${orderJson.message}` };
    }

    // the backend wraps the created order inside `data.order` along with
    // any products; the top-level `data.id` is undefined so we must reach
    // inside the `order` property.
    const orderId = orderJson.data.order?.id;

    // 2. Create Razorpay checkout session (we no longer use the
    // provider-agnostic `/payment/intent` route).
    const paymentRes = await fetch(
      `${API_BASE_URL}/payment/razorpay/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId }),
      },
    );

    console.log("Razorpay checkout response:", paymentRes);

    const paymentJson = await paymentRes.json();

    if (paymentJson.ok) {
      if (paymentJson.data.checkoutUrl) {
        // legacy: if we ever get a URL, follow it
        return redirect(paymentJson.data.checkoutUrl);
      }
      return { paymentInfo: paymentJson.data };
    } else {
      console.error(
        "Failed to create Razorpay checkout:",
        paymentRes.status,
        paymentJson,
      );
      return {
        message: `Could not initiate payment: ${paymentJson.message}`,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: `An unexpected error occurred: ${error.message}` };
    }
    return { message: "An unexpected error occurred." };
  }
}
