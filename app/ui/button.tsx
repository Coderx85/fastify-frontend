import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "underline-offset-4 hover:underline text-blue-600",
};

const sizeClasses: Record<string, string> = {
  default: "h-10 py-2 px-4",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref,
  ) => {
    const classes = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
      variantClasses[variant] || variantClasses.default
    } ${sizeClasses[size] || sizeClasses.default} ${className}`;
    return <button className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";
