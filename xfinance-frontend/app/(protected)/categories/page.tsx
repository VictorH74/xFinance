import { CategoryList } from "@/components/pages/categories/CategoryList";
import { PageTitle } from "@/components/pages/protected/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "XFinance | Categories",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <PageTitle title="Categorias" description="Gerencie as categorias usadas em transações e metas" />

        <CategoryList />
      </div>
    </main>
  );
}
