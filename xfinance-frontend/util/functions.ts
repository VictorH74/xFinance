import { Category } from "@/lib/modules/categories/domain/category.types";
import { MONTH_LIST } from "./constants";

export const getColorBackground = (color: string, opacity?: number) => {
  const input = color.trim();

  if (input.startsWith("#")) {
    let hex = input.slice(1);

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    if (hex.length >= 6) {
      return `#${hex.slice(0, 6)}${opacity || 10}`;
    }
  }

  const rgbMatch = input.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${(opacity || 10) / 255})`;
    }
  }

  return input;
};

type CurrencyT = "BRL" | "EN";

export const formatCurrency = (value: number, currency: CurrencyT) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const getCurrentMonthName = () => {
  const date = new Date();
  return MONTH_LIST[date.getMonth()];
};

export const getCategoryName = (cat: Pick<Category, "name" | "localizedName">) => cat.localizedName?.["pt-BR"] ?? cat.name