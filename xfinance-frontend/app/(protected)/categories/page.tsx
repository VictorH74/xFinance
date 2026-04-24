import { Metadata } from "next";

const categories = [
  { name: "Housing", share: "28%", monthlyLimit: "$1,800", status: "On track" },
  { name: "Food", share: "14%", monthlyLimit: "$750", status: "Watchlist" },
  { name: "Transport", share: "8%", monthlyLimit: "$420", status: "On track" },
  {
    name: "Subscriptions",
    share: "5%",
    monthlyLimit: "$120",
    status: "Needs cleanup",
  },
];

export const metadata: Metadata = {
  title: "XFinance | Categories",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-linear-to-br from-amber-400 via-orange-400 to-rose-500 p-8 text-white shadow-lg shadow-orange-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/75">
            Categories
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Understand where your budget is really going.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Group expenses with intention, compare budget share, and quickly
            identify categories that deserve attention.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Active categories</p>
            <p className="mt-2 text-3xl font-semibold">11</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Highest share</p>
            <p className="mt-2 text-3xl font-semibold">Housing</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Needs review</p>
            <p className="mt-2 text-3xl font-semibold">2 categories</p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Budget allocation</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Share of the monthly budget by category.
            </p>

            <div className="mt-6 space-y-4">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium text-zinc-950">{category.name}</p>
                    <p className="text-sm text-zinc-500">{category.share}</p>
                  </div>
                  <div className="h-3 rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-orange-400 to-rose-500"
                      style={{ width: category.share }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Category status</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Limits and health indicators for your budget groups.
            </p>

            <div className="mt-6 space-y-4">
              {categories.map((category) => (
                <div key={`${category.name}-status`} className="rounded-2xl bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-zinc-950">{category.name}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200">
                      {category.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">
                    Monthly limit: {category.monthlyLimit}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
