import { ListableCategory } from "@/modules/categories/domain/category.types";
import { formatCurrency, getColorBackground, getCurrentMonthName } from "@/util/functions";

export const CategoryCard: React.FC<{
  cat: ListableCategory;
}> = ({ cat }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
      <div
        className="size-10 rounded-md grid place-items-center"
        style={{
          backgroundColor: getColorBackground(cat.color, 10),
        }}
      >
        <p>{cat.emoji}</p>
      </div>
      <p className="font-semibold text-zinc-600">{cat.localizedName?.["pt-BR"] ?? cat.name}</p>
      <p className="text-sm text-zinc-500 font-medium">
        {cat.transactionCount} transações ·{" "}
        {cat.hasActiveMeta ? "Meta ativa" : "Sem meta"}
      </p>
      <p className="font-semibold text-zinc-500">
        {formatCurrency(cat.currentMonthExpense, "BRL")} em{" "}
        {getCurrentMonthName().toLowerCase()}
      </p>
    </div>
  );
};