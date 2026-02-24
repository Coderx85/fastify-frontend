"use client";

// Import files
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions/auth.actions";
import { loginSchema } from "@/schemas/auth.schemas";
import { useTransition, useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import * as z from "zod";

// Types definition
type LoginInput = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [serverError, dispatch] = useActionState(loginAction, undefined);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema as any),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    const fd = new FormData();
    fd.append("email", data.email);
    fd.append("password", data.password);
    startTransition(() => dispatch(fd));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </Label>
        <div className="mt-1">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          className="flex w-full justify-center"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Log in"}
        </Button>
      </div>

      {serverError && (
        <p className="text-sm text-red-500">{(serverError as any).message}</p>
      )}
    </form>
  );
};

export default LoginForm;
