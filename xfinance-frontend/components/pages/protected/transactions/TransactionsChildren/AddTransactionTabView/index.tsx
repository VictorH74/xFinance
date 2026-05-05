import React from "react";
import { Tabs } from "antd";
import { GeminiAiIcon } from "@/components/shared/GeminiAiIcon";
import ArticleIcon from "@mui/icons-material/Article";
import { Select, DatePicker } from "antd";
import dayjs from 'dayjs';

const catMockList = [
  {
    id: "📦",
    emoji: "📦",
    name: "Sem categoria",
  },
  {
    id: "💼",
    emoji: "💼",
    name: "Income",
  },
  {
    id: "🏠",
    emoji: "🏠",
    name: "Casa",
  },
  {
    id: "📺",
    emoji: "📺",
    name: "Assinatura",
  },
  {
    id: "✈️",
    emoji: "✈️",
    name: "Viajem",
  },
  {
    id: "🚗",
    emoji: "🚗",
    name: "Transporte",
  },
];

const dateFormatList = ['D/M/YYYY', 'DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const transactionTypeOptions = [
  { id: "expense", label: "🔴 Gasto" },
  { id: "income", label: "🟢 Lucro" },
];

const tabs = [
  {
    Icon: GeminiAiIcon,
    label: "Adição por texto",
    children: (
      <div>
        <div className="flex flex-row items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold">Adição por texto</h3>
          <span className="text-emerald-600 bg-emerald-50 rounded-lg px-2 text-sm">
            ✦ IA
          </span>
        </div>
        <form action="">
          <input
            type="text"
            className="w-full bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none"
            placeholder="gastei 45 reais no almoço hoje no restaurante"
          />
        </form>
      </div>
    ),
  },
  {
    Icon: ArticleIcon,
    label: "Adição por formulário",
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-3">Adição por formulário</h3>
        <form action="" className="grid grid-cols-2 gap-2">
          <Select
            className="w-full"
            placeholder="Selecionar categorias"
            onChange={(value) => {
              console.log(`selected ${value}`);
            }}
            options={
              catMockList.map((d) => ({
                ...d,
                value: d.id,
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
            className="w-full"
            placeholder="Selecionar categorias"
            defaultValue={["expense"]}
            onChange={(value) => {
              console.log(`selected ${value}`);
            }}
            options={
              transactionTypeOptions.map((d) => ({
                ...d,
                value: d.id,
                label: d.label,
              })) ?? []
            }
            optionRender={(option) => (
              <div className="flex gap-2">
                {option.data.label}
              </div>
            )}
          />
          <input
            type="number"
            className="bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none col-span-1"
            placeholder="50"
          />
          {/* TODO: invalidate selected date up to current */}
          <DatePicker defaultValue={dayjs(new Date().toLocaleDateString(), dateFormatList[0])}  format={dateFormatList} />
          <input
            type="text"
            className="bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none col-span-2"
            placeholder="Descrição"
          />
        </form>
      </div>
    ),
  },
];

export const AddTransactionTabView = () => {
  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2"
      data-aos="flip-up"
      data-aos-delay={300}
    >
      <Tabs
        defaultActiveKey="2"
        items={tabs.map(({ Icon, children, label }, i) => {
          return {
            key: String(i),
            label,
            children,
            icon: <Icon />,
          };
        })}
      />
    </section>
  );

  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2"
      data-aos="flip-up"
      data-aos-delay={300}
    >
      <div className="flex flex-row items-center gap-2">
        <h3 className="text-lg font-semibold">Adição por texto</h3>
        <span className="text-emerald-600 bg-emerald-50 rounded-lg px-2 text-sm">
          ✦ IA
        </span>
      </div>
      <form action="">
        <input
          type="text"
          className="w-full bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none"
          placeholder="gastei 45 reais no almoço hoje no restaurante"
        />
      </form>
    </section>
  );
};
