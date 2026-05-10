import { Button } from "@/components/shared/Button";
import { useCategories } from "@/modules/categories/domain/category.queries";
import { useCreateTransactions } from "@/modules/transactions/domain/transaction.queries";
import { Transaction } from "@/modules/transactions/domain/transaction.types";
import { getCategoryName } from "@/util/functions";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

const dateFormatList = [
  "D/M/YYYY",
  "DD/MM/YYYY",
  "DD/MM/YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
];

const transactionTypeOptions = [
  { id: "expense", label: "🔴 Saída" },
  { id: "income", label: "🟢 Entrada" },
];

export const AddTransactionForm = () => {
  const [categoryId, setCategoryId] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [type, setType] = React.useState<Transaction["type"]>("expense");
  const [date, setDate] = React.useState(
    dayjs(new Date().toLocaleDateString(), dateFormatList[0]),
  );
  const [description, setDescription] = React.useState("");

  const { mutate, isPending } = useCreateTransactions();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      [
        {
          aiRawText: null,
          importBatchId: null,
          source: "ai_text",
          amount,
          categoryId: categoryId,
          date: date.toDate(),
          description,
          type,
        },
      ],
      {
        onSuccess() {
          setType("expense");
          setCategoryId("");
          setDescription("");
          setAmount(0);
          setDate(dayjs(new Date().toLocaleDateString(), dateFormatList[0]));
        },
      },
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Adição por formulário</h3>
      <form
        action=""
        className="grid grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        <Select
          className="w-full h-11"
          placeholder="Selecionar categorias"
          onChange={(value) => {
            setCategoryId(value);
          }}
          disabled={isLoadingCategories || isPending}
          options={
            (categories ?? []).map((d) => ({
              ...d,
              value: d.id,
              label: `${d.emoji} ${getCategoryName(d)}`,
            })) ?? []
          }
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
          className="w-full h-11"
          placeholder="Selecionar categorias"
          defaultValue={[type]}
          onChange={(value) => {
            setType(value);
          }}
          options={
            transactionTypeOptions.map((d) => ({
              ...d,
              value: d.id,
              label: d.label,
            })) ?? []
          }
          optionRender={(option) => (
            <div className="flex gap-2">{option.data.label}</div>
          )}
        />
        <input
          type="number"
          className="bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none col-span-1"
          placeholder="50"
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
        />
        {/* TODO: invalidate selected date up to current */}
        <DatePicker
          className="h-11"
          defaultValue={date}
          format={dateFormatList}
          onChange={(value) => {
            if (!value) return;
            setDate(value);
          }}
        />
        <input
          type="text"
          className="bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none col-span-2"
          placeholder="Descrição"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <div className="flex justify-end mt-3 gap-2 col-span-2">
          <Button type="button" className="bg-zinc-300 text-zinc-700">Limpar campos</Button>
          <Button className="w-64">Adicionar</Button>
        </div>
      </form>
    </div>
  );
};
