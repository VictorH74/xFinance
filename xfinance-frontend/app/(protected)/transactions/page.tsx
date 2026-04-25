import { Metadata } from "next";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { PageTitle } from "@/components/pages/protected/PageTitle";

const transactions = [
  {
    description: "Salary deposit",
    category: "Income",
    date: "Apr 02",
    amount: "+$6,000",
  },
  {
    description: "Apartment rent",
    category: "Housing",
    date: "Apr 05",
    amount: "-$1,450",
  },
  {
    description: "Supermarket",
    category: "Food",
    date: "Apr 09",
    amount: "-$420",
  },
  {
    description: "Streaming bundle",
    category: "Subscriptions",
    date: "Apr 11",
    amount: "-$42",
  },
  {
    description: "Freelance payment",
    category: "Income",
    date: "Apr 14",
    amount: "+$980",
  },
];

export const metadata: Metadata = {
  title: "XFinance | Transactions",
};

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <PageTitle
          title="Transações"
          description="Importe seu extrato ou lance manualmente via IA"
        />

        <section className="flex flex-row gap-2">
          <button className="rounded-2xl cursor-pointer border border-zinc-200 bg-white shadow-sm grow p-6 text-center text-zinc-700">
            <div className="grid place-items-center size-12 mx-auto bg-zinc-100 rounded-md">
              <InsertDriveFileIcon className="" />
            </div>
            <h3 className=" font-semibold text-lg">
              Extrato bancário CSV / OFX
            </h3>
            <p className="text-zinc-400">Arraste ou clique para selecionar</p>
            <p className="text-zinc-400">
              Compatível com Nubank, Itaú, Bradesco e outros
            </p>
            <div className="border border-zinc-600 mt-5 rounded-md w-fit mx-auto px-3 text-sm font-semibold py-1">
              Selecionar arquivo
            </div>
          </button>
          <button className="rounded-2xl cursor-pointer border border-zinc-200 bg-white shadow-sm grow p-6 text-center text-zinc-700">
            <div className="grid place-items-center size-12 mx-auto bg-zinc-100 rounded-md">
              <InsertChartIcon className="" />
            </div>
            <h3 className=" font-semibold text-lg">Planilha Excel / CSV</h3>
            <p className="text-zinc-400">Importe sua planilha existente</p>
            <p className="text-zinc-400">
              O sistema categoriza automaticamente
            </p>
            <div className="border border-zinc-600 mt-5 rounded-md w-fit mx-auto px-3 text-sm font-semibold py-1">
              Selecionar planilha
            </div>
          </button>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-lg font-semibold">Adição por texto</h3>
            <span className="text-emerald-600 bg-emerald-50 rounded-lg px-2 text-sm">
              ✦ IA
            </span>
          </div>
          <form action="">
            <input
              type="text"
              className="w-full bg-zinc-100 border border-zinc-300 rounded-md p-2 outline-none"
              placeholder="gastei 45 reais no almoço hoje no restaurante"
            />
          </form>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Entradas desse mês</p>
            <p className="mt-2 text-3xl font-semibold">128</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Maior Gasto</p>
            <p className="mt-2 text-3xl font-semibold">$1,450</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Cobranças recorrentes?</p>
            <p className="mt-2 text-3xl font-semibold">12</p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 px-6 py-5">
            <h2 className="text-xl font-semibold">Histórico de transações</h2>
            <p className="text-sm text-zinc-500">
              A focused view of the most recent financial activity.
            </p>
          </div>

          <div className="divide-y divide-zinc-200">
            {transactions.map((transaction) => (
              <article
                key={`${transaction.description}-${transaction.date}`}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-zinc-950">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
                <p className="text-lg font-semibold text-zinc-950">
                  {transaction.amount}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
