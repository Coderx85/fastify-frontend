// microverse/app/lib/definitions.ts

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
};

export type ApiResponse<T> = {
  ok: boolean;
  statusCode: number;
  message: string;
  data: T;
};
