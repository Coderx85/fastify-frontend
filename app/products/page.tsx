import React from "react";

import { getProducts } from "@/actions/products.actions";
import { Building2 } from "lucide-react";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="bg-secondary/10 h-full w-full">
      <h1 className="text-3xl font-bold text-center py-10">Products Page</h1>
      <div className="max-w-4xl mx-auto px-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col h-48 justify-between"
              >
                <div className="flex gap-3">
                  <Building2 className="fill-secondary/25" />
                  <h2 className="text-lg text-primary mb-2">{product.name}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button className="bg-secondary text-white px-4 py-2 justify-end rounded hover:bg-primary/90">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
