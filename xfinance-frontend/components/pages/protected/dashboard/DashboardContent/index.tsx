"use client";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import { LineChartGraph } from "./LineChartGraph";
import PieChartGraph from "./PieChartGraph";
import { useTransactions } from "@/lib/modules/transactions/domain/transaction.queries";
import { useDashboardData } from "@/lib/modules/dashboard/domain/dashboard.queries";
import { DashboardFilters } from "@/lib/modules/dashboard/domain/dashboard.types";
import { twMerge } from "tailwind-merge";
import { getColorBackground } from "@/util/functions";
import { Transaction } from "@/lib/modules/transactions/domain/transaction.types";
import { TransactionTile } from "@/components/shared/TransactionTile";
import { DatePicker, Select } from "antd";

const options = [
  {
    label: "Happy",
    value: "happy",
    emoji: "😄",
    desc: "Feeling Good",
  },
  {
    label: "Sad",
    value: "sad",
    emoji: "😢",
    desc: "Feeling Blue",
  },
  {
    label: "Angry",
    value: "angry",
    emoji: "😡",
    desc: "Furious",
  },
  {
    label: "Cool",
    value: "cool",
    emoji: "😎",
    desc: "Chilling",
  },
  {
    label: "Sleepy",
    value: "sleepy",
    emoji: "😴",
    desc: "Need Sleep",
  },
];

const { RangePicker } = DatePicker;

const getDateRangeByPeriod = (
  period: "30d" | "60d" | "90d",
): [string, string] => {
  const now = new Date();

  const daysMap = {
    "30d": 30,
    "60d": 60,
    "90d": 90,
  } as const;

  const minDate = new Date(now);
  minDate.setDate(now.getDate() - daysMap[period]);

  const format = (date: Date) => date.toISOString().split("T")[0];

  return [format(minDate), format(now)];
};

const dateRangePresetList = [
  {
    label: "30d",
    range: getDateRangeByPeriod("30d"),
  },
  {
    label: "60d",
    range: getDateRangeByPeriod("60d"),
  },
  {
    label: "90d",
    range: getDateRangeByPeriod("90d"),
  },
];

const getSourceText = (source: Transaction["source"]): string => {
  if (source === "ai_text") return "Adicionado via IA";
  if (source === "csv_import") return "Importado via CSV";
  if (source === "ofx_import") return "Importado via OFX";
  return "Adicionado manualmente";
};

const renderOverviewCardIcon = (name: string) => {
  if (name === "balance") return <AttachMoneyIcon sx={{ fontSize: 20 }} />;
  if (name === "incomeTotal") return <TrendingUpIcon sx={{ fontSize: 20 }} />;
  if (name === "expenseTotal")
    return <TrendingDownIcon sx={{ fontSize: 20 }} />;
  if (name === "savingsRate") return <SavingsIcon sx={{ fontSize: 20 }} />;

  return null;
};

// TODO: make it funcional
const dateStr = (date: string): string => {
  // return example
  return "16 abr";
};

/*
TODO: GET /dashboard?period=30d
{
  period: '30d',
  summary: {
    balance: 4320.00,       // calculado: income_total - expense_total do período
    income_total: 8500.00,
    expense_total: 4180.00,
    savings_rate: 0.49
  },
  monthly_evolution: [      // sempre 4 meses, independe do period
    { month: '2025-01', income: 7200, expense: 5100 },
    { month: '2025-02', income: 7800, expense: 4800 },
    { month: '2025-03', income: 8200, expense: 4300 },
    { month: '2025-04', income: 8500, expense: 4180 },
  ],
  expenses_by_category: [   // filtra pelo period
    { category_id: '...', name: 'Moradia', emoji: '🏠', color: '#175CD3', total: 1340, percentage: 32 },
    ...
  ],
  recent_transactions: [    // 5 mais recentes dentro do period
    { id, description, amount, type, date, category: { name, emoji, color } },
    ...
  ]
}
*/

// TODO: make it shared
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export const DashboardContent = () => {
  const [filters, setFilters] = React.useState<DashboardFilters>({});
  const { data, isLoading, isError, refetch } = useDashboardData(filters);

  const summary = React.useMemo(() => {
    return [
      {
        iconName: "balance",
        label: "Saldo",
        value: formatCurrency(data?.summary.balance ?? 0),
        tone: "text-emerald-600",
        aosDelay: 0
      },
      {
        iconName: "incomeTotal",
        label: "Receita",
        value: formatCurrency(data?.summary.incomeTotal ?? 0),
        tone: "text-cyan-600",
        aosDelay: 100
      },
      {
        iconName: "expenseTotal",
        label: "Gastos",
        value: formatCurrency(data?.summary.expenseTotal ?? 0),
        tone: "text-rose-600",
        aosDelay: 250
      },
      {
        iconName: "savingsRate",
        label: "Valor economizado",
        value: formatCurrency(data?.summary.savingsRate ?? 0),
        tone: "text-zinc-950",
        aosDelay: 400
      },
    ];
  }, [data]);

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {dateRangePresetList.map((d) => (
          <button
            key={d.label}
            className="px-2 py-1 rounded-md text-zinc-500 font-medium border border-zinc-300 cursor-pointer"
          >
            {d.label}
          </button>
        ))}
        <RangePicker />
        <Select
          mode="multiple"
          className="w-full"
          placeholder="Selecionar categorias"
          // defaultValue={["happy"]}
          onChange={(value) => {
            console.log(`selected ${value}`);
          }}
          options={data?.expensesByCategory.map(d => ({...d, value: d.name, label: `${d.emoji} ${d.name}`})) ?? []}
          optionRender={(option) => (
            <div className="flex gap-2">
              <span role="img" aria-label={option.data.name}>
                {option.data.emoji}
              </span>
              {option.data.name}
            </div>
          )}
        />
        <Select
          defaultValue={'null'}
          // style={{ width: 120 }}
          className="w-56"
          onChange={(value) => {
            console.log(`selected ${value}`);
          }}
          options={[
            { value: 'null', label: "Todas as entradas e saída" },
            { value: "income", label: "Entradas" },
            { value: "expense", label: "Saídas" },
          ]}
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            data-aos="flip-up"
            data-aos-delay={card.aosDelay}
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
        <LineChartGraph dataList={data?.monthlyEvolution ?? []} />

        <PieChartGraph dataList={data?.expensesByCategory ?? []} />
      </section>

      {/* <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm" data-aos="fade-up">
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
      </section> */}

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <article>
          <h2 className="text-xl font-semibold">Atividades recente</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Os últimos movimentos que afetaram seu saldo
          </p>

          <div className="mt-6 space-y-4">
            {(data?.recentTransactions ?? []).map((item) => (
              <TransactionTile key={item.id} item={item} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
