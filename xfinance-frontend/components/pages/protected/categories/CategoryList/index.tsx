"use client";

import { useCategories } from "@/lib/modules/categories/domain/category.queries";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardPlaceholder } from "./CategoryCardPlaceholder";
import React from "react";
import { formatCurrency, getCurrentMonthName } from "@/util/functions";
import { PageTitle } from "../../PageTitle";
import { Button } from "@/components/shared/Button";
import { AddCategoryModal } from "./AddCategoryModal";

export const CategoryList = () => {
  const [showNewCategoryModal, setShowNewCategoryModal] = React.useState(false);

  const { data, isLoading, isError } = useCategories();

  const sommary = React.useMemo(() => {
    if (!data)
      return {
        count: 0,
        spendsTheMost: null,
        withActiveGoal: 0,
      };

    const catThatSpendsTheMost = data.reduce((selectedCat, currCat) => {
      if (
        selectedCat &&
        currCat.currentMonthExpense > selectedCat.currentMonthExpense
      ) {
        return currCat;
      }
    }, data.at(0));

    return {
      count: data.length,
      spendsTheMost: catThatSpendsTheMost,
      withActiveGoal: data.filter((cat) => cat.hasActiveMeta).length,
    };
  }, [data]);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle
          title="Categorias"
          description="Gerencie as categorias usadas em transações e metas"
        />
        <Button onClick={() => setShowNewCategoryModal(true)}>
          + Nova categoria
        </Button>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <div
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          data-aos="flip-up"
        >
          <p className="text-sm text-zinc-500">Total de categorias</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">
            {sommary.count}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {/* TODO: implement */}
            10 padrão · 0 personalizadas
          </p>
        </div>
        <div
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          data-aos="flip-up"
          data-aos-delay={150}
        >
          <p className="text-sm text-zinc-500">Mais gasta</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">
            {sommary.spendsTheMost
              ? `${sommary.spendsTheMost.emoji} ${sommary.spendsTheMost.name}`
              : "-"}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {`${formatCurrency(sommary?.spendsTheMost?.currentMonthExpense ?? 0, "BRL")} em ${getCurrentMonthName()}`}
          </p>
        </div>
        <div
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          data-aos="flip-up"
          data-aos-delay={300}
        >
          <p className="text-sm text-zinc-500">Com meta ativa</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-600">
            {sommary.withActiveGoal}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            de {sommary.count} categorias
          </p>
        </div>
      </section>

      <section className="grid gap-4 grid-cols-3">
        {isLoading ? (
          Array(3)
            .fill(null)
            .map((_, i) => <CategoryCardPlaceholder key={i} />)
        ) : isError || !data ? (
          <p>Error</p>
        ) : (
          data.map((cat) => <CategoryCard key={cat.id} cat={cat} />)
        )}
      </section>
      <AddCategoryModal
        open={showNewCategoryModal}
        onClose={() => setShowNewCategoryModal(false)}
      />
    </>
  );
};
