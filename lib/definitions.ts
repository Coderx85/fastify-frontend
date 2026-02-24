// microverse/app/lib/definitions.ts

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
};

export type ApiResponse<T> =
  | {
      ok: true;
      statusCode: number;
      message: string;
      data: T;
    }
  | {
      ok: false;
      statusCode: number;
      message: string;
      error: string;
    };
