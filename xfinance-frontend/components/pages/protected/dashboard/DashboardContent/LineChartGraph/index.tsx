import { GetDashboarDataResponseT } from "@/lib/modules/dashboard/domain/dashboard.types";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// TODO: make it shared
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
  
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
        <XAxis dataKey="month" />
        <YAxis width="auto" label={{ position: "insideLeft", angle: -90 }} />
        <Legend align="right" />
        <Tooltip />
      </LineChart>
    </article>
  );
};
