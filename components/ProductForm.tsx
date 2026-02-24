"use client";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { productSchema, ZCategory } from "@/schemas/product.schema";
import { createProduct } from "@/actions/products.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type ProductInput = z.infer<typeof productSchema>;

const ProductForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Electronics",
    },
  });

  const onSubmit = (data: ProductInput) => {
    startTransition(async () => {
      const result = await createProduct(data);
      if (result.success) {
        console.log("Product created successfully:", result.data);
        reset(); // Reset form on success
      } else {
        console.error("Failed to create product:", result.error);
        // Here you could update the form state with errors from the server
      }
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">Add New Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter the product name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter the product price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Enter the product description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {ZCategory.options.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
