import { ButtonHTMLAttributes } from "react";
import { ColorType } from "../types/api/common";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorType;
  size?: "sm" | "md" | "lg";
}

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const getVariantClasses = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-rose-400 text-white hover:bg-rose-500 focus:ring-4 focus:ring-rose-200 focus:ring-offset-0";
      case "secondary":
        return "bg-gray-300 text-gray-900 hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 focus:ring-offset-0";
      case "dark":
        return "bg-black text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 focus:ring-offset-0";
      case "white":
        return "bg-white border-2 border-rose-400 text-black focus:ring-4 focus:ring-rose-200 focus:ring-offset-0";
      default:
        return "bg-rose-400 text-white hover:bg-rose-500 focus:ring-4 focus:ring-rose-200 focus:ring-offset-0";
    }
  };

  const getSizeClasses = (size: ButtonProps["size"]) => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "lg":
        return "px-5 py-3 text-lg";
      default:
        return "px-4 py-2.5 text-base";
    }
  };

  return (
    <>
      <button
        className={`text-center whitespace-nowrap rounded-lg font-bold transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed 
          ${getVariantClasses(variant)} 
          ${getSizeClasses(size)} ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
