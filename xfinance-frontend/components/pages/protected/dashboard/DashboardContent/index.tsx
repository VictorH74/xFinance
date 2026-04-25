"use client";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import { LineChartGraph } from "./LineChartGraph";
import PieChartGraph from "./PieChartGraph";

interface DashboardContentProps {}

const activityItems = [
  { name: "Salary", category: "Income", amount: "+$6,000" },
  { name: "Rent", category: "Housing", amount: "-$1,450" },
  { name: "Groceries", category: "Food", amount: "-$420" },
  { name: "Emergency fund", category: "Transfer", amount: "+$600" },
];

const overviewCards = [
  {
    iconName: "balance",
    label: "Balance",
    value: "$24,580",
    tone: "text-emerald-600",
  },
  {
    iconName: "income",
    label: "Income",
    value: "$8,400",
    tone: "text-cyan-600",
  },
  {
    iconName: "expenses",
    label: "Expenses",
    value: "$5,120",
    tone: "text-rose-600",
  },
  {
    iconName: "saved-money",
    label: "Saved this month",
    value: "$2,140",
    tone: "text-zinc-950",
  },
];

const renderOverviewCardIcon = (name: string) => {
  if (name === "balance") return <AttachMoneyIcon sx={{ fontSize: 20 }} />;
  if (name === "income") return <TrendingUpIcon sx={{ fontSize: 20 }} />;
  if (name === "expenses") return <TrendingDownIcon sx={{ fontSize: 20 }} />;
  if (name === "saved-money") return <SavingsIcon sx={{ fontSize: 20 }} />;

  return null;
};

export const DashboardContent = (props: DarchboardContentProps) => {
  // TODO: fetch user transactions by period (7d - 30d - 90d) where type === "output"
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-row gap-2 items-center">
              <div className="bg-zinc-200 size-8 grid place-items-center rounded-md">
                {renderOverviewCardIcon(card.iconName)}
              </div>
              <p className="text-sm text-zinc-500">{card.label}</p>
            </div>
            <p className={`mt-2 text-3xl font-semibold ${card.tone}`}>
              {card.value}
            </p>
          </article>
        ))}
      </section>
      <section className="flex flex-row gap-3">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm grow">
          <h3 className="text-lg text-zinc-500 font-semibold">Evolução mensal</h3>
          <p className="text-zinc-400">Receitas vs Gastos — 2026</p>
          <LineChartGraph />
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg text-zinc-500 font-semibold">Gastos por categoria</h3>
          <p className="text-zinc-400">Distribuição em abril</p>
          <PieChartGraph />
        </article>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <article>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Spending rhythm</h2>
              <p className="text-sm text-zinc-500">
                Weekly pace across the current month.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Stable
            </span>
          </div>

          <div className="mt-8 grid h-64 grid-cols-4 items-end gap-4">
            {[48, 72, 58, 84].map((value, index) => (
              <div key={value} className="flex flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end rounded-2xl bg-zinc-100 p-2">
                  <div
                    className="w-full rounded-xl bg-linear-to-t from-cyan-500 to-emerald-400"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-500">Week {index + 1}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <article>
          <h2 className="text-xl font-semibold">Recent activity</h2>
          <p className="mt-1 text-sm text-zinc-500">
            The latest movements affecting your balance.
          </p>

          <div className="mt-6 space-y-4">
            {activityItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-zinc-950">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.category}</p>
                </div>
                <p className="font-semibold text-zinc-950">{item.amount}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
