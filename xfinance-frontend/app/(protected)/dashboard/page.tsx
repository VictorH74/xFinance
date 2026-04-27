import { DashboardContent } from "@/components/pages/protected/dashboard/DashboardContent";
import { PageTitle } from "@/components/pages/protected/PageTitle";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "XFinance | Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex justify-between items-center">
          <PageTitle
            title="Dashboard"
            description="Abril 2025 · visão geral das suas finanças"
          />
          <Link href={'/export'} replace className="bg-white border border-zinc-300 cursor-pointer px-3 py-2 rounded-md">Exportar</Link>
        </div>

        <DashboardContent />

      </div>
    </main>
  );
}
