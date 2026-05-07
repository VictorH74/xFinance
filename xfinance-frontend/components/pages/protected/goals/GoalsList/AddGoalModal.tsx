"use client";

import React from "react";
import { Button } from "@/components/shared/Button";
import { useCategories } from "@/lib/modules/categories/domain/category.queries";
import { useCreateGoal } from "@/lib/modules/goals/domain/goal.queries";
import CloseIcon from "@mui/icons-material/Close";
import { Select } from "antd";
import { getCategoryName } from "@/util/functions";

type AddGoalModalProps = {
  open: boolean;
  onClose: () => void;
};

export const AddGoalModal = ({ open, onClose }: AddGoalModalProps) => {
  const now = React.useMemo(() => new Date(), []);
  const [categoryId, setCategoryId] = React.useState("");
  const [amountLimit, setAmountLimit] = React.useState("");
  const [periodMonth, setPeriodMonth] = React.useState(now.getMonth());
  const [periodYear, setPeriodYear] = React.useState(now.getFullYear());
  const [notificationAt, setNotificationAt] = React.useState("80");
  const [isRecurring, setIsRecurring] = React.useState(true);

  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { mutate, isPending } = useCreateGoal();

  const resetForm = React.useCallback(() => {
    setCategoryId("");
    setAmountLimit("");
    setPeriodMonth(now.getMonth());
    setPeriodYear(now.getFullYear());
    setNotificationAt("80");
    setIsRecurring(true);
  }, [now]);

  const handleClose = React.useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId || !amountLimit) return;

    mutate(
      {
        categoryId,
        amountLimit: Number(amountLimit),
        periodMonth,
        periodYear,
        notificationAt: Number(notificationAt),
        isRecurring,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/35 px-4">
      <div
        className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl"
        data-aos="flip-up"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">
              Adicionar meta
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Defina um limite por categoria para acompanhar seu ritmo de
              gastos.
            </p>
          </div>
          <button
            type="button"
            className="text-sm text-zinc-500 transition hover:text-zinc-900"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              Categoria
            </span>

            <Select
              className="w-full h-12 rounded-xl"
              placeholder="Selecionar categorias"
              onChange={(value) => {
                setCategoryId(value);
              }}
              disabled={isLoadingCategories || isPending}
              options={
                (categories ?? []).map((d) => ({
                  ...d,
                  value: d.id,
                  label: `${d.emoji} ${getCategoryName(d)}`,
                })) ?? []
              }
              optionRender={(option) => (
                <div className="flex gap-2">
                  <span role="img" aria-label={getCategoryName(option.data)}>
                    {option.data.emoji}
                  </span>
                  {getCategoryName(option.data)}
                </div>
              )}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              Limite mensal
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none"
              placeholder="Ex.: 1500"
              value={amountLimit}
              onChange={(e) => setAmountLimit(e.currentTarget.value)}
              disabled={isPending}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">
                Mes
              </span>
              <input
                type="number"
                min="0"
                max="11"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none"
                value={periodMonth}
                onChange={(e) => setPeriodMonth(Number(e.currentTarget.value))}
                disabled={isPending}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">
                Ano
              </span>
              <input
                type="number"
                min="2024"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none"
                value={periodYear}
                onChange={(e) => setPeriodYear(Number(e.currentTarget.value))}
                disabled={isPending}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">
                Alerta %
              </span>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none"
                value={notificationAt}
                onChange={(e) => setNotificationAt(e.currentTarget.value)}
                disabled={isPending}
              />
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.currentTarget.checked)}
              disabled={isPending}
            />
            <span className="text-sm text-zinc-700">
              Repetir automaticamente nos proximos meses
            </span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              className="bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button className="min-w-36" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar meta"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
