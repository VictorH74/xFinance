import { Metadata } from "next";

const exportFormats = [
  {
    format: "CSV",
    description: "Clean tabular export for spreadsheets and custom analysis.",
  },
  {
    format: "PDF",
    description: "Polished summary for sharing monthly financial snapshots.",
  },
  {
    format: "JSON",
    description: "Structured raw data for integrations and automation.",
  },
];

export const metadata: Metadata = {
  title: "XFinance | Export",
};

export default function ExportPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-linear-to-br from-violet-600 via-fuchsia-600 to-rose-500 p-8 text-white shadow-lg shadow-fuchsia-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/75">
            Export
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Package your financial data in the format you need.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Prepare reports, share summaries, or move your history into other
            tools without losing structure.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Available exports</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Choose the output that best fits your workflow.
            </p>

            <div className="mt-6 grid gap-4">
              {exportFormats.map((item) => (
                <div
                  key={item.format}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.format}</h3>
                    <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
                      Export
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Suggested package</h2>
            <p className="mt-1 text-sm text-zinc-500">
              A practical bundle for end-of-month review.
            </p>

            <div className="mt-6 rounded-2xl bg-zinc-950 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                Monthly close
              </p>
              <p className="mt-3 text-3xl font-semibold">CSV + PDF summary</p>
              <p className="mt-3 text-sm text-zinc-300">
                Export raw transactions for analysis and a polished report for
                presentation or archival.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
