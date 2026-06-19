import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeMap[size]} animate-spin rounded-full border-[var(--border)] border-t-[var(--primary)]`}
      role="status"
      aria-label="Carregando"
    />
  );
}
