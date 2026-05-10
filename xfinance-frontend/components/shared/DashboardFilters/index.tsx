"use client";

import { DashboardFilters as DashboardFiltersT } from "@/modules/dashboard/domain/dashboard.types";
import { dateRangePresetList } from "@/modules/dashboard/domain/dashboard-filter.utils";
import { ListableCategory } from "@/modules/categories/domain/category.types";
import { getCategoryName } from "@/util/functions";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type DashboardFiltersProps = {
  filters: DashboardFiltersT;
  onChange: (filters: DashboardFiltersT) => void;
  categories?: ListableCategory[];
};

export const DashboardFilters = ({
  filters,
  onChange,
  categories = [],
}: DashboardFiltersProps) => {
  const selectedPresetLabel = dateRangePresetList.find(
    (preset) =>
      preset.range[0] === filters.startDate &&
      preset.range[1] === filters.endDate,
  )?.label;
  const hasManualRange =
    !!filters.startDate && !!filters.endDate && !selectedPresetLabel;
  const selectedRange =
    filters.startDate && filters.endDate
      ? [dayjs(filters.startDate), dayjs(filters.endDate)]
      : null;

  return (
    <div className="flex gap-2">
      {dateRangePresetList.map((preset) => (
        <button
          key={preset.label}
          className={`px-2 py-1 rounded-md font-medium border cursor-pointer transition-colors ${
            selectedPresetLabel === preset.label
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-zinc-300 text-zinc-500"
          }`}
          onClick={() => {
            onChange({
              ...filters,
              startDate: preset.range[0],
              endDate: preset.range[1],
            });
          }}
        >
          {preset.label}
        </button>
      ))}

      <RangePicker
        value={selectedRange}
        className={`w-120 ${
          hasManualRange
            ? "[&_.ant-picker-active-bar]:bg-emerald-500 [&_.ant-picker-input>input]:text-emerald-700 [&.ant-picker]:border-emerald-500 [&.ant-picker]:bg-emerald-50 [&.ant-picker]:shadow-[0_0_0_2px_rgba(16,185,129,0.12)]"
            : ""
        }`}
        onChange={(value) => {
          if (!value?.[0] || !value?.[1]) {
            const nextFilters = { ...filters };
            delete nextFilters.startDate;
            delete nextFilters.endDate;
            onChange(nextFilters);
            return;
          }

          onChange({
            ...filters,
            startDate: value[0].toISOString(),
            endDate: value[1].toISOString(),
          });
        }}
      />

      <Select
        mode="multiple"
        className="w-full"
        placeholder="Selecionar categorias"
        value={filters.categoryIds}
        onChange={(value) => {
          const nextFilters = { ...filters };

          if ((value as string[]).length === 0) {
            delete nextFilters.categoryIds;
            onChange(nextFilters);
            return;
          }

          onChange({
            ...nextFilters,
            categoryIds: value as string[],
          });
        }}
        options={categories.map((category) => ({
          ...category,
          value: category.id,
          label: `${category.emoji} ${getCategoryName(category)}`,
        }))}
        optionRender={(option) => (
          <div className="flex gap-2">
            <span role="img" aria-label={getCategoryName(option.data)}>
              {option.data.emoji}
            </span>
            {getCategoryName(option.data)}
          </div>
        )}
      />

      <Select
        value={filters.transactionType ?? "null"}
        className="w-56"
        onChange={(value) => {
          const nextFilters = { ...filters };

          if (value === "null") {
            delete nextFilters.transactionType;
            onChange(nextFilters);
            return;
          }

          onChange({
            ...nextFilters,
            transactionType: value,
          });
        }}
        options={[
          { value: "null", label: "Todas as entradas e saída" },
          { value: "income", label: "Entradas" },
          { value: "expense", label: "Saídas" },
        ]}
      />
    </div>
  );
};
