import React from "react";
import { type LucideIcon } from "lucide-react";

type Size = "sm" | "md" | "lg";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  size?: Size;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  containerClassName?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const iconSize: Record<Size, number> = {
  sm: 13,
  md: 15,
  lg: 17,
};

const iconPadding: Record<Size, { left: string; right: string }> = {
  sm: { left: "pl-8", right: "pr-8" },
  md: { left: "pl-9", right: "pr-9" },
  lg: { left: "pl-10", right: "pr-10" },
};

const iconOffset: Record<Size, string> = {
  sm: "top-1/2 -translate-y-1/2 left-2.5",
  md: "top-1/2 -translate-y-1/2 left-3",
  lg: "top-1/2 -translate-y-1/2 left-3.5",
};

const iconOffsetRight: Record<Size, string> = {
  sm: "top-1/2 -translate-y-1/2 right-2.5",
  md: "top-1/2 -translate-y-1/2 right-3",
  lg: "top-1/2 -translate-y-1/2 right-3.5",
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  containerClassName = "",
  className = "",
  disabled,
  id,
  ...props
}) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.01em",
            color: error ? "#ef4444" : "inherit",
          }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <span
            className={`absolute ${iconOffset[size]} text-[var(--muted-foreground)] pointer-events-none`}
          >
            <LeftIcon size={iconSize[size]} />
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={[
            "w-full rounded-md bg-white border outline-none transition-all duration-150",
            "placeholder:text-[var(--muted-foreground)]",
            // "hover:shadow-md hover:-translate-y-0.5",
            // "focus:shadow-md focus:-translate-y-0.5",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-300"
              : "border-border hover:border-[#f0d98a] focus:ring-2 focus:ring-primary/50",
            sizeClasses[size],
            LeftIcon ? iconPadding[size].left : "",
            RightIcon ? iconPadding[size].right : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.01em" }}
          {...props}
        />

        {RightIcon && (
          <span
            className={`absolute ${iconOffsetRight[size]} text-[var(--muted-foreground)] pointer-events-none`}
          >
            <RightIcon size={iconSize[size]} />
          </span>
        )}
      </div>

      {error && (
        <span
          className="text-xs text-red-500"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
