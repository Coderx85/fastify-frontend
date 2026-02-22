import { Card, CardContent, CardHeader } from "@/app/ui";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-transparent w-full">
      <Card className="max-w-md text-center bg-green-400 w-full">
        <CardHeader className="flex gap-2.5 text-3xl font-bold mb-4 bg-transparent text-white">
          <span role="img" aria-label="success">
            ✅
          </span>{" "}
          Payment Successful!
        </CardHeader>
        <CardContent className="mx-auto max-w-sm flex flex-col px-5 py-3 bg-green-800/50 text-white font-semibold rounded-lg">
          <p className="text-lg text-white">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <p className="mt-2 text-sm text-white/60">
            You will receive an email confirmation shortly with the details of
            your order.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
