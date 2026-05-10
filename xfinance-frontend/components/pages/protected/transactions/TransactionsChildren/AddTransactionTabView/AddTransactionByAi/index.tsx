import { Button } from "@/components/shared/Button";
import { api } from "@/lib/http/api-client";
import { useCreateTransactions } from "@/modules/transactions/domain/transaction.queries";
import { Transaction } from "@/modules/transactions/domain/transaction.types";
import { formatCurrency, getCategoryName } from "@/util/functions";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { useCategories } from "@/modules/categories/domain/category.queries";

type ErrorType = "INSUFFICIENT_DATA" | "AMBIGUOUS" | "PARSING_ERROR";

type TransactionFormT = Pick<
  Transaction,
  "description" | "categoryId" | "amount" | "type" | "date"
>;

type ErrorT = {
  message: string;
  type: ErrorType;
};

const dateDisplayFormat = "DD/MM/YYYY";
const dateStorageSuffix = "T00:00:00Z";
const dateStorageFormat = "YYYY-MM-DD";

const transactionTypeOptions = [
  { id: "expense", label: "🔴 Saída" },
  { id: "income", label: "🟢 Entrada" },
];

const getErrorMessage = (type: ErrorType) => {
  if (type === "AMBIGUOUS")
    return "O texto fornecido é ambíguo e pode ser interpretado de várias maneiras. Tente fornecer mais detalhes ou reformular a frase para esclarecer o significado.";
  if (type === "INSUFFICIENT_DATA")
    return "Os dados fornecidos são insuficientes para extrair as informações necessárias. Tente incluir mais detalhes ou reformular a frase para fornecer informações mais completas.";
  if (type === "PARSING_ERROR")
    return "Ocorreu um erro ao processar o texto fornecido. Tente reformular a frase ou verificar se há erros de digitação que possam estar causando o problema.";
  return "Ocorreu um erro desconhecido.";
};

const transactionKeyLabel = (k: keyof TransactionFormT) => {
  if (k === "amount") return "Valor";
  if (k === "categoryId") return "Categoria";
  if (k === "date") return "Data";
  if (k === "description") return "Descrição";
  if (k === "type") return "Tipo";
  return "-";
};

export const AddTransactionByAi = () => {
  const [loadingExtracting, setLoadingExtracting] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [transactions, setTransactions] = React.useState<TransactionFormT[]>(
    [],
  );
  const [errors, setError] = React.useState<ErrorT[]>([]);

  const { mutate, isPending } = useCreateTransactions();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const toDatePickerValue = (value: string) =>
    dayjs(value.slice(0, dateStorageFormat.length), dateStorageFormat);

  const transactionValue = (
    k: keyof TransactionFormT,
    v: unknown,
    index: number,
  ) => {
    if (k === "amount") return formatCurrency(v as number, "BRL");
    if (k === "categoryId")
      return (
        <Select
          disabled={isLoadingCategories || isPending}
          className="w-40 h-11"
          defaultValue={!!v ? (v as string) : "null"}
          placeholder="Selecionar categorias"
          onChange={(value) => {
            setTransactions((prev) =>
              prev.map((t, i) =>
                i === index ? { ...t, categoryId: value } : t,
              ),
            );
          }}
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
      );
    if (k === "date")
      return (
        <DatePicker
          className="h-11"
          value={toDatePickerValue(v as string)}
          format={dateDisplayFormat}
          onChange={(value) => {
            if (!value) return;
            setTransactions((prev) =>
              prev.map((t, i) =>
                i === index
                  ? {
                      ...t,
                      date: `${value.format("YYYY-MM-DD")}${dateStorageSuffix}`,
                    }
                  : t,
              ),
            );
          }}
        />
      );
    if (k === "description")
      return <p className="font-semibold">{v as string}</p>;
    if (k === "type")
      return (
        <Select
          className="w-40 h-11"
          placeholder="Selecionar categorias"
          defaultValue={[v]}
          onChange={(value) => {
            setTransactions((prev) =>
              prev.map((t, i) =>
                i === index
                  ? { ...t, type: value as unknown as Transaction["type"] }
                  : t,
              ),
            );
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
      );
    return <p className="font-semibold">-</p>;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoadingExtracting(true);
      const formData = new FormData();
      formData.set("userInput", input);

      const res = await fetch("/api/ai/transaction-data-extraction", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return alert("error");

      const data = (await res.json()) as {
        transactions: TransactionFormT[];
        errors: ErrorT[];
      };

      if (data.transactions.length > 0) setTransactions(data.transactions);
      else if (data.errors.length > 0) setError(data.errors);
    } finally {
      setLoadingExtracting(false);
    }
  };

  const handleAddTransaction = async () => {
    if (transactions.length === 0) return;

    mutate(
      transactions.map((t) => ({
        ...t,
        aiRawText: input,
        importBatchId: null,
        source: "ai_text",
        categoryId: t.categoryId === "null" ? null : t.categoryId,
      })),
      {
        onSuccess() {
          setInput("");
          setTransactions([]);
          setError([]);
        },
      },
    );
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold">Adição por texto</h3>
        <span className="text-emerald-600 bg-emerald-50 rounded-lg px-2 text-sm">
          ✦ IA
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full bg-zinc-50 border border-zinc-300 rounded-md p-2 outline-none"
          placeholder="gastei 45 reais no almoço hoje no restaurante"
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        <div className="flex justify-end mt-3">
          <Button
            className={twMerge(
              "w-60",
              input === "" && "pointer-events-none opacity-60",
            )}
          >
            {loadingExtracting ? "Extraindo..." : "Extrair dados"}
          </Button>
        </div>
      </form>

      {transactions.length > 0 && (
        <div className="bg-zinc-100 rounded-lg p-5 w-full mt-3">
          <p>Extração de dados</p>
          <div className="divide-y-2">
            {transactions.map((t, i) => (
              <div key={i} className="divide-y divide-zinc-200">
                {Object.entries(t).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between items-center p-2"
                  >
                    <p>{transactionKeyLabel(k as keyof TransactionFormT)}</p>

                    {transactionValue(k as keyof TransactionFormT, v, i)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            className={twMerge(
              "w-full",
              isPending && "pointer-events-none opacity-60",
            )}
            onClick={handleAddTransaction}
          >
            {isPending ? "Adicionando" : "Adicionar"}
          </Button>
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-400 rounded-lg p-5 w-full mt-3 text-white font-medium">
          <div className="divide-y-2">
            {errors.map((t, i) => (
              <div key={i} className="divide-y divide-zinc-200">
                <p>{getErrorMessage(t.type)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

//
