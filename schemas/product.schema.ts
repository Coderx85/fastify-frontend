import { z } from "zod";

export const ZCategory = z.enum([
  "Electronics",
  "Clothing",
  "Books",
  "Furniture",
]);

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .number("Price must be a number")
    .positive({ message: "Price must be greater than zero" }),
  category: ZCategory,
});
