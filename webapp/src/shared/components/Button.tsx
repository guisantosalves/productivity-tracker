import React from "react";
import { Loader2, type LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
  secondary:
    "bg-white text-foreground border border-border hover:bg-[#ffedba] hover:border-[#f0d98a] shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent text-foreground hover:bg-[#ffedba] hover:shadow-sm",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2.5",
};

const iconSize: Record<Size, number> = {
  sm: 13,
  md: 15,
  lg: 17,
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 cursor-pointer",
        "hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.01em" }}
      {...props}
    >
      {loading ? (
        <Loader2 size={iconSize[size]} className="animate-spin" />
      ) : (
        LeftIcon && <LeftIcon size={iconSize[size]} />
      )}
      {children}
      {!loading && RightIcon && <RightIcon size={iconSize[size]} />}
    </button>
  );
};
