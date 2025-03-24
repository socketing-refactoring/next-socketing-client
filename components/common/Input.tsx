import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${className} px-4 py-2 border border-gray-300 rounded-lg text-base w-full focus:outline-none focus:border-rose-400`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
