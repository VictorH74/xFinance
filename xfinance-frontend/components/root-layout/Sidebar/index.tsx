"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "DS" },
  { href: "/transactions", label: "Transactions", shortLabel: "TR" },
  { href: "/categories", label: "Categories", shortLabel: "CA" },
  { href: "/goals", label: "Goals", shortLabel: "GO" },
  { href: "/export", label: "Export", shortLabel: "EX" },
  { href: "/configurations", label: "Configurations", shortLabel: "CF" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-72 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white px-4 py-5">
      <div className="space-y-6">
        <div className="rounded-3xl bg-linear-to-br from-zinc-950 via-zinc-900 to-emerald-900 p-5 text-white">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-200/80">
            xFinance
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Money, but with direction.
          </h1>
          <p className="mt-2 text-sm text-zinc-300">
            Centralize planning, cash flow, categories, and savings goals.
          </p>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {item.shortLabel}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-zinc-500">
                    {isActive ? "Current view" : "Open section"}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-950">Monthly focus</p>
        <p className="mt-1 text-sm text-zinc-500">
          Review subscriptions, move spare cash to goals, and export your month
          before closing the cycle.
        </p>
      </div>
    </aside>
  );
}
