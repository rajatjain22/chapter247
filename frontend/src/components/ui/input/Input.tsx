import React, { ChangeEvent, useState, ForwardedRef } from "react";
import { CloseEyeIcon, OpenEyeIcon } from "@/icons";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  error?: string;
  prefix?: React.ReactNode;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      prefix,
      inputSize = "",
      type = "text",
      name = "",
      className = "",
      placeholder = "",
      error = "",
      value = "",
      onChange,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const errorClass = error ? "border-red-600" : "border-gray-300";
    const classes = [
      "input-control w-full border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none",
      errorClass,
      inputSize,
      className,
      type === "password" ? "!pr-9" : "",
      prefix ? "!pl-9" : "",
    ].join(" ");

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 inline-block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : type}
            id={id}
            name={name}
            autoComplete="off"
            className={classes}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...rest}
          />
          {prefix && <span className="absolute top-3 left-3">{prefix}</span>}
          {type === "password" && (
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <CloseEyeIcon width={25} height={25} />
              ) : (
                <OpenEyeIcon width={25} height={25} />
              )}
            </div>
          )}
        </div>

        {error && (
          <div
            id={`${id}-error`}
            className="text-red-600 mt-1 inline-block text-xs font-medium"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
