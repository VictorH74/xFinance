import { Metadata } from "next";

const settingsGroups = [
  {
    title: "Profile",
    description: "Name, preferred currency, and date formatting preferences.",
  },
  {
    title: "Notifications",
    description: "Bill reminders, goal updates, and monthly closing alerts.",
  },
  {
    title: "Security",
    description: "Session controls, device trust, and account protection.",
  },
];

export const metadata: Metadata = {
  title: "XFinance | Configurations",
};

export default function ConfigurationsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-linear-to-br from-emerald-700 via-teal-700 to-sky-700 p-8 text-white shadow-lg shadow-emerald-950/10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/75">
            Configurations
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Tune the workspace around the way you manage money.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Adjust preferences, notifications, and account-level controls in one
            place.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Settings groups</h2>
            <p className="mt-1 text-sm text-zinc-500">
              The core areas you will likely want to revisit over time.
            </p>

            <div className="mt-6 space-y-4">
              {settingsGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Workspace snapshot</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Quick view of the current setup.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">Default currency</p>
                <p className="mt-1 text-lg font-semibold">USD</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">Closing reminder</p>
                <p className="mt-1 text-lg font-semibold">Enabled</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <p className="text-sm text-zinc-500">Trusted devices</p>
                <p className="mt-1 text-lg font-semibold">3 active</p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
