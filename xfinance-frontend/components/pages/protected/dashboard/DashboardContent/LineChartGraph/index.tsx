import { GetDashboarDataResponseT } from "@/lib/modules/dashboard/domain/dashboard.types";
import { formatCurrency } from "@/util/functions";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const formatMonthLabel = (month: string) => {
  const [year, monthNumber] = month.split("-");
  const date = new Date(Number(year), Number(monthNumber) - 1, 1);

  return new Intl.DateTimeFormat("pt-BR", {
    month: "numeric",
    year: "2-digit"
  }).format(date);
};

const formatCompactCurrency = (value: number) => {
  if (Math.abs(value) >= 1000) {
    const compactValue = Number.isInteger(value / 1000)
      ? value / 1000
      : Number((value / 1000).toFixed(1));

    return `R$ ${compactValue}k`;
  }

  return formatCurrency(value, "BRL");
};

export const LineChartGraph = ({
  dataList,
}: {
  dataList: GetDashboarDataResponseT["monthlyEvolution"];
}) => {
  return (
    <article
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm grow flex flex-col items-center"
      data-aos="fade-right"
    >
      <div className="w-full">
        <h3 className="text-lg text-zinc-500 font-semibold">Evolução mensal</h3>
        <p className="text-zinc-400">Receitas vs Gastos — 2026</p>
      </div>
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618 }}
        responsive
        data={dataList}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          dataKey="income"
          stroke="green"
          strokeWidth={2}
          name="Ganhos (R$)"
        />
        <Line
          dataKey="expense"
          stroke="red"
          strokeWidth={2}
          name="Gastos (R$)"
        />
        <XAxis
          dataKey="month"
          interval={0}
          minTickGap={0}
          tickFormatter={formatMonthLabel}
        />
        <YAxis
          width={70}
          tickFormatter={formatCompactCurrency}
          axisLine={false}
          tickLine={false}
        />
        <Legend align="right" />
        <Tooltip
          content={(props) => <CustomTooltip {...props} list={dataList} />}
        />
      </LineChart>
    </article>
  );
};

const getIntroOfPage = (
  month: string | undefined = undefined,
  list: GetDashboarDataResponseT["monthlyEvolution"],
) => {
  if (!month) return null;

  const item = list.find((d) => d.month === month);

  if (!item) return null;
  return item;
};

const CustomTooltip = ({
  active,
  payload,
  list,
}: TooltipContentProps & {
  list: GetDashboarDataResponseT["monthlyEvolution"];
}) => {
  const isVisible = active && payload && payload.length;

  const data = getIntroOfPage(payload?.[0]?.payload.month, list);

  if (!data) return null;

  return (
    <div
      className="px-4 py-2 border border-zinc-200 bg-white"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <p className="text-zinc-500 text-sm">{data.month}</p>
      <p className="text-green-600">{formatCurrency(data.income, "BRL")}</p>
      <p className="text-red-600">{formatCurrency(data.expense, "BRL")}</p>
    </div>
  );
};
