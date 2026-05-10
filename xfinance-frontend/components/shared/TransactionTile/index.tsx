import { ListableTransaction } from "@/modules/transactions/domain/transaction.types";
import { MONTH_LIST } from "@/util/constants";
import {
  formatCurrency,
  getCategoryName,
  getColorBackground,
} from "@/util/functions";
import React from "react";
import { twMerge } from "tailwind-merge";

const getSourceText = (source: ListableTransaction["source"]): string => {
  if (source === "ai_text") return "Adicionado via IA";
  if (source === "csv_import") return "Importado via CSV";
  if (source === "ofx_import") return "Importado via OFX";
  return "Adicionado manualmente";
};

const getFormattedDate = (_date: Date) => {
  const date = new Date(_date);
  return `${date.getUTCDate()} ${MONTH_LIST[date.getMonth()]}`;
};

// TODO: ...
const currCurrency = "BRL";

export const TransactionTile: React.FC<{
  item: ListableTransaction;
  containerClassName?: string;
}> = ({ item, containerClassName }) => {
  return (
    <div
      key={item.id}
      className={twMerge(
        "flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4",
        containerClassName,
      )}
      // data-aos="fade-up"
      // data-aos-delay={500}
    >
      <div className="flex gap-3">
        <div
          className="size-10 rounded-md grid place-items-center"
          style={{
            backgroundColor: getColorBackground(
              item.category?.color ?? "#606060",
              10,
            ),
          }}
        >
          <p className="text-lg">{item.category?.emoji ?? "📦"}</p>
        </div>
        <div>
          <p className="font-medium text-zinc-950">{item.description}</p>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-zinc-500">
              {item.category ? getCategoryName(item.category) : "Sem categoria"}
            </p>
            <div className="size-1 rounded-full bg-zinc-400" />
            <p className="text-sm text-zinc-400">
              {getFormattedDate(item.date)}
            </p>
            <div className="size-1 rounded-full bg-zinc-400" />
            <p className="text-sm text-zinc-400">
              {getSourceText(item.source)}
            </p>
          </div>
        </div>
      </div>
      <p
        className={twMerge(
          "font-semibold",
          item.type === "income" ? "text-green-700" : "text-red-700",
        )}
      >
        {item.type === "income" ? "+" : "-"}{" "}
        {formatCurrency(item.amount, currCurrency)}
      </p>
    </div>
  );
};
