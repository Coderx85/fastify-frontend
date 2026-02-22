import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={
        "rounded-lg border bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900 " +
        className
      }
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`} {...props} />;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
export function CardTitle({ className = "", ...props }: CardTitleProps) {
  return <h2 className={`text-xl font-semibold ${className}`} {...props} />;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function CardContent({ className = "", ...props }: CardContentProps) {
  return <div className={className} {...props} />;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function CardFooter({ className = "", ...props }: CardFooterProps) {
  return <div className={`mt-4 ${className}`} {...props} />;
}
