import { Pie, PieChart, Tooltip, PieSectorShapeProps, Sector, TooltipContentProps } from "recharts";

const dataList = [
  { name: "Moradia", percent: 32, color: "#175CD3" },
  { name: "Alimentação", percent: 24, color: "#0E9F6E" },
  { name: "Lazer", percent: 18, color: "#B54708" },
  { name: "Outros", percent: 26, color: "#98A2B3" },
];

const getIntroOfPage = (percent: number, list: typeof dataList) => {
  const item = list.find(d => d.percent === percent)

  if (!item) return null

  return {name: item.name, color: item.color}
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={dataList[props.index].color} />;
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  const isVisible = active && payload && payload.length;

  const data = getIntroOfPage(Number(payload?.[0]?.value )?? 0, dataList)

  return (
    <div className="custom-tooltip bg-white flex flex-row gap-2 p-2 items-center" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
        <div className="size-4" style={{backgroundColor: data.color}} />
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
}: {
  isAnimationActive?: boolean;
}) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={[
          { name: "Moradia", percent: 32 },
          { name: "Alimentação", percent: 24 },
          { name: "Lazer", percent: 18 },
          { name: "Outros", percent: 26 },
        ]}
        dataKey="percent"
        nameKey="name"
        isAnimationActive={isAnimationActive}
        cx="50%"
        cy="50%"
        innerRadius="55%"
        outerRadius="80%"
        shape={MyCustomPie}
      />
      <Tooltip content={CustomTooltip} />
    </PieChart>
  );
}
