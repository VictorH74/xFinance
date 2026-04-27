"use client";

import React from "react";
import { PageTitle } from "../../PageTitle";
import { useGoals } from "@/lib/modules/goals/domain/goal.queries";
import { getColorBackground } from "@/util/functions";
import { twMerge } from "tailwind-merge";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";

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
  const { data, isError, isLoading, refetch } = useGoals();

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
            <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
              Add goal
            </button>
          </div>

          <div className="divide-y divide-zinc-200">
            {(data ?? []).map((goal) => {
              const progress = Math.round(
                (goal.currentValue / goal.amountLimit) * 100,
              );

              const remainingValue = goal.amountLimit - goal.currentValue;

              const cat = goal.category.name !== "" ? goal.category : null;

              return (
                <article key={goal.id} className="grid gap-2 px-6 py-5" data-aos-delay={500} data-aos="flip-up">
                  <div className="flex flex-row justify-between">
                    <div>
                      {/* CAT DATA */}
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div
                          className="py-1 px-4 rounded-full flex gap-2 items-center"
                          style={{
                            backgroundColor: getColorBackground(
                              cat?.color ?? "#5d5d5d",
                              20,
                            ),
                          }}
                        >
                          {cat && <p className="text-lg -mt-1">{cat.emoji}</p>}

                          <p className="text-[0.875rem] font-semibold text-zinc-600">
                            {cat?.name ?? "Sem categoria"}
                          </p>
                        </div>
                      </div>
                      <div className="text-zinc-500 font-medium text-sm">
                        R$ {goal.currentValue} de R$ {goal.amountLimit}
                      </div>
                    </div>

                    <div className="text-right">
                      <div>
                        {Math.round(
                          (goal.currentValue / goal.amountLimit) * 100,
                        )}
                        %
                      </div>
                      <div
                        className={twMerge(
                          "font-semibold text-sm px-4 py-1 rounded-full",
                          progress > 100
                            ? "text-red-600 bg-red-600/10"
                            : progress > goal.notificationAt
                              ? "text-amber-600 bg-amber-600/10"
                              : "text-green-600 bg-green-600/10",
                        )}
                      >
                        {progress > 100
                          ? "excedida"
                          : progress > goal.notificationAt
                            ? "quase no limite"
                            : "dentro do limite"}
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* PROGRESS BAR */}
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className={twMerge(
                          "h-full rounded-full",
                          progress > 100
                            ? "bg-red-600"
                            : progress > goal.notificationAt
                              ? "bg-amber-600"
                              : "bg-green-600",
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div
                      className={twMerge(
                        "font-medium text-sm",
                        remainingValue < 0 ? "text-red-700" : "text-zinc-500",
                      )}
                    >
                      {formatCurrency(Math.abs(remainingValue))}{" "}
                      {remainingValue < 0 ? "ultrapassado" : "restante"}
                    </div>
                    <div className="flex">
                      <button className=" border-red-500 px-6 py-1 rounded-md text-zinc-500 font-semibold hover:bg-red-700 hover:text-white duration-200">
                        <DeleteIcon sx={{ fontSize: 20 }} />
                      </button>
                      <button className=" border-zinc-300 px-6 py-1 rounded-md text-zinc-500 font-semibold hover:bg-blue-400 hover:text-white duration-200">
                        <EditSquareIcon sx={{ fontSize: 20 }} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};
