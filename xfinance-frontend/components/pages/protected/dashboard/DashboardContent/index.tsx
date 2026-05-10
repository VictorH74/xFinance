"use client";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LineChartGraph } from "./LineChartGraph";
import PieChartGraph from "./PieChartGraph";
import { useDashboardData } from "@/modules/dashboard/domain/dashboard.queries";
import { DashboardFilters } from "@/modules/dashboard/domain/dashboard.types";
import { TransactionTile } from "@/components/shared/TransactionTile";
import { TransactionTilePlaceholder } from "@/components/shared/TransactionTilePlaceholder";
import { DashboardFilters as DashboardFiltersControl } from "@/components/shared/DashboardFilters";
import {
  getDashboardFiltersFromSearchParams,
  saveDashboardFilters,
} from "@/modules/dashboard/domain/dashboard-filter.utils";
import { useCategories } from "@/modules/categories/domain/category.queries";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = React.useMemo<DashboardFilters>(() => {
    return getDashboardFiltersFromSearchParams(searchParams);
  }, [searchParams]);
  const { data: categories } = useCategories();
  const updateFilters = React.useCallback((nextFilters: DashboardFilters) => {
    const params = new URLSearchParams();

    if (nextFilters.startDate && nextFilters.endDate) {
      params.set("startDate", nextFilters.startDate);
      params.set("endDate", nextFilters.endDate);
    }

    nextFilters.categoryIds?.forEach((categoryId) => {
      params.append("categoryIds", categoryId);
    });

    if (nextFilters.transactionType) {
      params.set("transactionType", nextFilters.transactionType);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [pathname, router]);
  const { data, isLoading, isError, refetch } = useDashboardData(filters);

  React.useEffect(() => {
    saveDashboardFilters(filters);
  }, [filters]);

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
        value: `${(data?.summary.savingsRate ?? 0) * 100}%`,
        tone: "text-zinc-950",
        aosDelay: 400,
      },
    ];
  }, [data]);

  return (
    <div className="space-y-8">
      <DashboardFiltersControl
        filters={filters}
        onChange={updateFilters}
        categories={categories}
      />

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
              (data?.recentTransactions ?? []).map((item) => (
                <TransactionTile key={item.id} item={item} />
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
};
