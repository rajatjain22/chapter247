import Image from "next/image";
import Spinner from "./Spinner";
import React from "react";

interface ButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  size?: "xsm" | "sm" | "md";
  variant?: "primary" | "secondary" | "outline" | "danger" | "success" | "warning";
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconSize?: { width: number; height: number };
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonTypes> = ({
  type = "button",
  size = "md",
  variant = "primary",
  children,
  className = "",
  icon,
  iconPosition = "left",
  iconSize = { width: 24, height: 24 },
  onClick,
  loading = false,
  disabled = false,
  ...rest
}) => {
  const sizeClasses: Record<string, string> = {
    xsm: "px-3 py-2 text-xs",
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-theme-xs hover:from-indigo-600 hover:to-purple-600 disabled:from-indigo-300 disabled:to-purple-300",
    secondary:
      "bg-yellow-300 text-gray-800 hover:bg-yellow-250 disabled:bg-yellow-50 disabled:text-yellow-400",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    danger:
      "!bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    success:
      "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300",
    warning:
      "bg-yellow-400 text-gray-900 hover:bg-yellow-500 disabled:bg-yellow-200",
  };

  const disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed" : "";
  const classes = ["btn cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed", disabledClass, className, sizeClasses[size], variantClasses[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Spinner className="w-5 h-5" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Image
              src={icon}
              alt="icon"
              width={iconSize.width}
              height={iconSize.height}
              className="mr-2"
            />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <Image
              src={icon}
              alt="icon"
              width={iconSize.width}
              height={iconSize.height}
              className="ml-2"
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
