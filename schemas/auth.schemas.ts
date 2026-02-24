import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    // <naem>@<company>.com
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
