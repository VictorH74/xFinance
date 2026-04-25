import { PageTitle } from "@/components/pages/protected/PageTitle";
import { Metadata } from "next";

const goals = [
  {
    name: "Emergency fund",
    current: 14800,
    target: 30000,
    deadline: "Dec 2026",
    category: "Safety",
  },
  {
    name: "Vacation in Japan",
    current: 6200,
    target: 12000,
    deadline: "Apr 2027",
    category: "Lifestyle",
  },
  {
    name: "Home office upgrade",
    current: 1800,
    target: 3500,
    deadline: "Aug 2026",
    category: "Productivity",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

  export const metadata: Metadata = {
  title: "XFinance | Goals",
};

export default function GoalsPage() {
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const completionRate = Math.round((totalCurrent / totalTarget) * 100);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950 w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <PageTitle title="Metas mensais" description="Defina limites de gasto por categoria" />

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total target</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(totalTarget)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Remaining amount</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(totalTarget - totalCurrent)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Nearest deadline</p>
            <p className="mt-2 text-2xl font-semibold">Aug 2026</p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">Goal breakdown</h2>
              <p className="text-sm text-zinc-500">
                A quick snapshot of each target and its current pace.
              </p>
            </div>
            <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
              Add goal
            </button>
          </div>

          <div className="divide-y divide-zinc-200">
            {goals.map((goal) => {
              const progress = Math.min(
                100,
                Math.round((goal.current / goal.target) * 100)
              );

              return (
                <article
                  key={goal.name}
                  className="grid gap-4 px-6 py-5 lg:grid-cols-[1.7fr_1fr_1fr]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">{goal.name}</h3>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {goal.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">
                      Deadline: {goal.deadline}
                    </p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-emerald-500 to-cyan-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-zinc-500">Saved</p>
                    <p className="mt-1 text-lg font-semibold">
                      {formatCurrency(goal.current)}
                    </p>
                    <p className="text-sm text-zinc-500">
                      of {formatCurrency(goal.target)}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-zinc-500">Completion</p>
                    <p className="mt-1 text-lg font-semibold">{progress}%</p>
                    <p className="text-sm text-zinc-500">
                      {formatCurrency(goal.target - goal.current)} to go
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
