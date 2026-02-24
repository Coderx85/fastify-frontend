"use server";

import { z } from "zod";
import { productSchema } from "@/schemas/product.schema";
import { config } from "@/lib/config";
import { ApiResponse } from "@/lib/definitions";
import { ProductInput, TCreateProduct } from "@/types/product";

export const createProduct = async (data: ProductInput) => {
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  try {
    // Here you would typically handle the database insertion
    // For now, we'll just log the data
    console.log("Creating product with data:", result.data);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Revalidate path if needed, for example:
    // revalidatePath("/products");

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred.",
    };
  }
};

export async function getProducts(): Promise<TCreateProduct[]> {
  try {
    const response = await fetch(config.BASE_URL + "/products");

    if (!response.ok) {
      console.error(
        "Failed to fetch products:",
        response.status,
        await response.text(),
      );
      throw new Error("Failed to fetch products");
    }

    const json: ApiResponse<{ products: TCreateProduct[] }> =
      await response.json();

    if (!json.ok) {
      throw new Error(json.message || "Failed to fetch products");
    }

    const products = json.data.products;

    return products;
  } catch (error) {
    throw new Error("An error occurred while fetching products: " + error);
  }
}
