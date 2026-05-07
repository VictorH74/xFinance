"use client";

import React from "react";
import { PageTitle } from "../../PageTitle";
import { useGoals } from "@/lib/modules/goals/domain/goal.queries";
import { GoalTilePlaceholder } from "./GoalTilePlaceholder";
import { GoalTile } from "./GoalTile";
import { Button } from "@/components/shared/Button";
import { AddGoalModal } from "./AddGoalModal";

// TODO: make it shared
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
// const formatCurrency = (value: number) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(value);

export const SummaryCard: React.FC<
  { title: string; content: string } & React.HTMLAttributes<HTMLDivElement>
> = ({ title, content, ...props }) => (
  <div
    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    {...props}
  >
    <p className="text-sm text-zinc-500">{title}</p>
    <p className="mt-2 text-2xl font-semibold">{content}</p>
  </div>
);

export const GoalsList = () => {
  const [showAddGoalModal, setShowAddGoalModal] = React.useState(false);
  const { data, isError, isLoading } = useGoals();

  // const [goals, addOptimistic] = React.useOptimistic(initialList);

  // async function handleDelete(id: string) {
  //   addOptimistic((prev) => prev.filter((c) => c.id !== id)); // atualiza UI antes da resposta
  //   await deleteGoalAction(id);
  // }

  const summary = React.useMemo(() => {
    if (!data)
      return {
        totalCurrent: 0,
        totalTarget: 0,
        completionRate: 0,
      };

    const totalCurrent = data.reduce((sum, goal) => sum + goal.currentValue, 0);
    const totalTarget = data.reduce((sum, goal) => sum + goal.amountLimit, 0);

    return {
      totalCurrent,
      totalTarget,
      completionRate: Math.round((totalCurrent / totalTarget) * 100),
    };
  }, [data]);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950 w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <PageTitle
          title="Metas mensais"
          description="Defina limites de gasto por categoria"
        />

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            data-aos="zoom-in"
            data-aos-delay={0}
            title="Total de limite"
            content={formatCurrency(summary.totalTarget)}
          />
          <SummaryCard
            data-aos="zoom-in"
            data-aos-delay={200}
            title="Valor restante"
            content={formatCurrency(summary.totalTarget - summary.totalCurrent)}
          />
          <SummaryCard
            data-aos="zoom-in"
            data-aos-delay={400}
            title="Mais prox. do prazo"
            content={"Ago 2026"}
          />
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">Lista de metas</h2>
              <p className="text-sm text-zinc-500">
                Uma rápida visão de cada alvo e seu ritmo atual.
              </p>
            </div>
            <Button className="py-2" onClick={() => setShowAddGoalModal(true)}>
              + Add goal
            </Button>
          </div>

          <div className="divide-y divide-zinc-200">
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((_, i) => <GoalTilePlaceholder key={i} />)
            ) : isError || !data ? (
              <p>Error</p>
            ) : (
              data.map((goal) => <GoalTile key={goal.id} goal={goal} />)
            )}
          </div>
        </section>
      </div>
      <AddGoalModal
        open={showAddGoalModal}
        onClose={() => setShowAddGoalModal(false)}
      />
    </main>
  );
};
