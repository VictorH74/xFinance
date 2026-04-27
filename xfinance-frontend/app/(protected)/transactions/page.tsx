import { Metadata } from "next";
import { TransactionsChildren } from "@/components/pages/protected/transactions/TransactionsChildren";

export const metadata: Metadata = {
  title: "XFinance | Transactions",
};

// TODO: at add by text form, implement autocomplete para user writting patterns


export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <TransactionsChildren />
    </main>
  );
}
