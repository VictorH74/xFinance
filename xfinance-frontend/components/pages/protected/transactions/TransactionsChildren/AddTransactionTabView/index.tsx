import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import { GeminiAiIcon } from "@/components/shared/GeminiAiIcon";
import ArticleIcon from "@mui/icons-material/Article";
import { AddTransactionByAi } from "./AddTransactionByAi";
import { AddTransactionForm } from "./AddTransactionForm";

const stylesObject: TabsProps['styles'] = {
  indicator: { backgroundColor: 'oklch(69.6% 0.17 162.48)' },
};

const tabs = [
  {
    Icon: GeminiAiIcon,
    label: "Adição por texto",
    children: <AddTransactionByAi />,
  },
  {
    Icon: ArticleIcon,
    label: "Adição por formulário",
    children: <AddTransactionForm />,
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
        className="
          [&_.ant-tabs-tab:hover_.ant-tabs-tab-btn]:text-emerald-600
          [&_.ant-tabs-tab.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-emerald-600
        "
        styles={stylesObject}
        defaultActiveKey="0"
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
};
