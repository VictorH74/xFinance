import { Metadata } from "next";

const overviewCards = [
  { label: "Balance", value: "$24,580", tone: "text-emerald-600" },
  { label: "Income", value: "$8,400", tone: "text-cyan-600" },
  { label: "Expenses", value: "$5,120", tone: "text-rose-600" },
  { label: "Saved this month", value: "$2,140", tone: "text-zinc-950" },
];

const activityItems = [
  { name: "Salary", category: "Income", amount: "+$6,000" },
  { name: "Rent", category: "Housing", amount: "-$1,450" },
  { name: "Groceries", category: "Food", amount: "-$420" },
  { name: "Emergency fund", category: "Transfer", amount: "+$600" },
];

export const metadata: Metadata = {
  title: "XFinance | Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-linear-to-br from-sky-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-lg shadow-cyan-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/75">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your financial pulse for this month.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Monitor cash flow, see where money moved recently, and identify the
            next action to keep your plan on track.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <article
              key={card.label}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-zinc-500">{card.label}</p>
              <p className={`mt-2 text-3xl font-semibold ${card.tone}`}>
                {card.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Spending rhythm</h2>
                <p className="text-sm text-zinc-500">
                  Weekly pace across the current month.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Stable
              </span>
            </div>

            <div className="mt-8 grid h-64 grid-cols-4 items-end gap-4">
              {[48, 72, 58, 84].map((value, index) => (
                <div key={value} className="flex flex-col items-center gap-3">
                  <div className="flex h-56 w-full items-end rounded-2xl bg-zinc-100 p-2">
                    <div
                      className="w-full rounded-xl bg-linear-to-t from-cyan-500 to-emerald-400"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-500">Week {index + 1}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Recent activity</h2>
            <p className="mt-1 text-sm text-zinc-500">
              The latest movements affecting your balance.
            </p>

            <div className="mt-6 space-y-4">
              {activityItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-zinc-950">{item.name}</p>
                    <p className="text-sm text-zinc-500">{item.category}</p>
                  </div>
                  <p className="font-semibold text-zinc-950">{item.amount}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
