"use client";

import { useCategories } from "@/lib/modules/categories/domain/category.queries";

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

export const CategoryList = () => {
  // const {} = useCategories()

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm" data-aos="flip-up">
          <p className="text-sm text-zinc-500">Total de categorias</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">7</p>
          <p className="mt-2 text-sm text-zinc-400">5 padrão · 2 personalizadas</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm" data-aos="flip-up" data-aos-delay={150}>
          <p className="text-sm text-zinc-500">Mais gasta</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">🏠 Moradia</p>
          <p className="mt-2 text-sm text-zinc-400">R$ 1.340 em abril</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm" data-aos="flip-up" data-aos-delay={300}>
          <p className="text-sm text-zinc-500">Com meta ativa</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">5</p>
          <p className="mt-2 text-sm text-zinc-400">de 7 categorias</p>
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
              <div
                key={`${category.name}-status`}
                className="rounded-2xl bg-zinc-50 p-4"
              >
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
    </>
  );
};
