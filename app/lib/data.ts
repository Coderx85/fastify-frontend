import { Product, ApiResponse } from "./definitions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function getBookById(id: string): Promise<Product | null> {
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
