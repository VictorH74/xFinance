import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & React.PropsWithChildren
> = ({ children, className, ...props }) => (
  <button
    className={twMerge(
      "py-3 px-4 bg-emerald-600 text-emerald-50 font-semibold rounded-lg cursor-pointer hover:brightness-110 duration-300 disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
