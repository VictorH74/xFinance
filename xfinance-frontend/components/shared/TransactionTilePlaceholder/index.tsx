import React from "react";
import { twMerge } from "tailwind-merge";

export const TransactionTilePlaceholder: React.FC<{
  containerClassName?: string;
}> = ({ containerClassName }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4 animate-pulse",
        containerClassName,
      )}
      // data-aos="fade-up"
      // data-aos-delay={500}
    >
      <div className="flex gap-3 items-center">
        <div className="size-10 rounded-md grid place-items-center bg-zinc-300" />
        <div className="space-y-2">
          <div className="bg-zinc-300 w-48 h-3.5" />
          <div className="bg-zinc-300 w-56 h-3" />
        </div>
      </div>
      <div className="bg-zinc-300 w-24 h-4.5" />
    </div>
  );
};
