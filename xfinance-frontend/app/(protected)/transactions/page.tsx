import { Metadata } from "next";

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
        <section className="rounded-3xl bg-linear-to-br from-zinc-950 via-zinc-900 to-sky-800 p-8 text-white shadow-lg shadow-zinc-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">
            Transactions
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Every movement, clearly organized.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80">
            Review incoming and outgoing cash, spot patterns, and stay close to
            the details behind your budget.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Entries this month</p>
            <p className="mt-2 text-3xl font-semibold">128</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Largest expense</p>
            <p className="mt-2 text-3xl font-semibold">$1,450</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Recurring charges</p>
            <p className="mt-2 text-3xl font-semibold">12</p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 px-6 py-5">
            <h2 className="text-xl font-semibold">Latest transactions</h2>
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
