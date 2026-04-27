import { GetDashboarDataResponseT } from "@/lib/modules/dashboard/domain/dashboard.types";
import {
  Pie,
  PieChart,
  Tooltip,
  PieSectorShapeProps,
  Sector,
  TooltipContentProps,
} from "recharts";

const getIntroOfPage = (
  name: string | undefined = undefined,
  list: GetDashboarDataResponseT["expensesByCategory"],
) => {
  if (!name) return null

  const item = list.find((d) => d.name === name);

  if (!item) return null;
  return { name: item.name, color: item.color };
};

const MyCustomPie = (
  props: PieSectorShapeProps & {
    list: GetDashboarDataResponseT["expensesByCategory"];
  },
) => {
  // console.log(props.index, props.list, props.list[props.index])
  return (
    <Sector {...props} fill={props.list[props.index]?.color ?? "#af4040"} />
  );
};

const CustomTooltip = ({
  active,
  payload,
  list,
}: TooltipContentProps & {
  list: GetDashboarDataResponseT["expensesByCategory"];
}) => {
  const isVisible = active && payload && payload.length;

  const data = getIntroOfPage(payload?.[0]?.payload.name, list);

  return (
    <div
      className="custom-tooltip bg-white flex flex-row gap-2 p-2 items-center"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <div
            className="size-4"
            style={{ backgroundColor: data?.color ?? "#707070" }}
          />
          <p>
            {data?.name || ""}: {payload[0].value}%
          </p>
        </>
      )}
    </div>
  );
};

export default function PieChartGraph({
  isAnimationActive = true,
  dataList,
}: {
  isAnimationActive?: boolean;
  dataList: GetDashboarDataResponseT["expensesByCategory"];
}) {
  return (
    <article
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
      data-aos="fade-left"
    >
      <h3 className="text-lg text-zinc-500 font-semibold">
        Gastos por categoria
      </h3>
      <p className="text-zinc-400">Distribuição em abril</p>
      <div className="flex gap-4 flex-wrap w-[400px]">
        {dataList.map((d) => (
          <div key={d.name} className="flex gap-1.5 items-center">
            <div
              className="size-3 rounded-xs"
              style={{ backgroundColor: d.color }}
            />
            <p className="text-[0.875rem]">{d.name}</p>
            <p className="text-[0.875rem]">{d.percentage}</p>
          </div>
        ))}
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={dataList}
          dataKey="percentage"
          nameKey="name"
          isAnimationActive={isAnimationActive}
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="80%"
          shape={(props) => <MyCustomPie {...props} list={dataList} />}
        />
        <Tooltip
          content={(props) => <CustomTooltip {...props} list={dataList} />}
        />
      </PieChart>
    </article>
  );
}
