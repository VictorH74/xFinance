import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";

const expenseList = [
  {
    name: "Jan",
    income: 7200,
    expense: 5100,
  },
  {
    name: "Fev",
    income: 7800,
    expense: 4800,
  },
  {
    name: "Mar",
    income: 8200,
    expense: 4300,
  },
  {
    name: "Abr",
    income: 8500,
    expense: 4180,
  },
];

// TODO: customize Tooltip

/*
TODO: must receive as props:
data: [
  { month: '2025-01', income: 7200, expense: 5100 },
  { month: '2025-02', income: 7800, expense: 4800 },
  { month: '2025-03', income: 8200, expense: 4300 },
  { month: '2025-04', income: 8500, expense: 4180 },
]
*/


export const LineChartGraph = () => {
  return (
        <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={expenseList}
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
        <XAxis dataKey="name" />
        <YAxis
          width="auto"
          label={{ position: "insideLeft", angle: -90 }}
        />
        <Legend align="right" />
        <Tooltip />
        {/* <RechartsDevtools /> */}
      </LineChart>
  );
};