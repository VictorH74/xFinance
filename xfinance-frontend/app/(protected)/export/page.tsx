import { PageTitle } from "@/components/pages/protected/PageTitle";
import { Metadata } from "next";
import { ClientChildren } from "@/components/pages/protected/export/ClientChildren";


export const metadata: Metadata = {
  title: "XFinance | Export",
};

export default function ExportPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <PageTitle
          title="Exportar"
          description="Baixe seus dados ou relatórios"
        />

        <ClientChildren />
      </div>
    </main>
  );
}
