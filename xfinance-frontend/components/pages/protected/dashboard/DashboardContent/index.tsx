"use client";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import { LineChartGraph } from "./LineChartGraph";
import PieChartGraph from "./PieChartGraph";
import { useDashboardData } from "@/lib/modules/dashboard/domain/dashboard.queries";
import { DashboardFilters } from "@/lib/modules/dashboard/domain/dashboard.types";
import { TransactionTile } from "@/components/shared/TransactionTile";
import { DatePicker, Select } from "antd";
import { TransactionTilePlaceholder } from "@/components/shared/TransactionTilePlaceholder";

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

const renderOverviewCardIcon = (name: string) => {
  if (name === "balance") return <AttachMoneyIcon sx={{ fontSize: 20 }} />;
  if (name === "incomeTotal") return <TrendingUpIcon sx={{ fontSize: 20 }} />;
  if (name === "expenseTotal")
    return <TrendingDownIcon sx={{ fontSize: 20 }} />;
  if (name === "savingsRate") return <SavingsIcon sx={{ fontSize: 20 }} />;

  return null;
};

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
        aosDelay: 0,
      },
      {
        iconName: "incomeTotal",
        label: "Receita",
        value: formatCurrency(data?.summary.incomeTotal ?? 0),
        tone: "text-cyan-600",
        aosDelay: 100,
      },
      {
        iconName: "expenseTotal",
        label: "Gastos",
        value: formatCurrency(data?.summary.expenseTotal ?? 0),
        tone: "text-rose-600",
        aosDelay: 250,
      },
      {
        iconName: "savingsRate",
        label: "Valor economizado",
        value: formatCurrency(data?.summary.savingsRate ?? 0),
        tone: "text-zinc-950",
        aosDelay: 400,
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
          onChange={(value) => {
            console.log(`selected ${value}`);
          }}
          options={
            data?.expensesByCategory.map((d) => ({
              ...d,
              value: d.name,
              label: `${d.emoji} ${d.name}`,
            })) ?? []
          }
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
          defaultValue={"null"}
          // style={{ width: 120 }}
          className="w-56"
          onChange={(value) => {
            console.log(`selected ${value}`);
          }}
          options={[
            { value: "null", label: "Todas as entradas e saída" },
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

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <article>
          <h2 className="text-xl font-semibold">Atividades recente</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Os últimos movimentos que afetaram seu saldo
          </p>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((_, i) => <TransactionTilePlaceholder key={i} />)
            ) : isError || !data ? (
              <p>Error</p>
            ) : (
              (data?.recentTransactions ?? []).map((item) => <TransactionTile key={item.id} item={item} />)
            )}
          </div>
        </article>
      </section>
    </div>
  );
};
