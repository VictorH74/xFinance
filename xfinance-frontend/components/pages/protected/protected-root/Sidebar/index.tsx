"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import CategoryIcon from "@mui/icons-material/Category";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SettingsIcon from "@mui/icons-material/Settings";
import { LogoutBtn } from "./LogoutBtn";
import { AuthUser } from "@/lib/modules/auth/domain/auth.types";

const navSection = [
  {
    title: "Principal",
    navItems: [
      { href: "/dashboard", label: "Dashboard", shortLabel: "DS" },
      { href: "/transactions", label: "Transactions", shortLabel: "TR" },
    ],
  },
  {
    title: "Planejamento",
    navItems: [
      { href: "/goals", label: "Goals", shortLabel: "GO" },
      { href: "/categories", label: "Categories", shortLabel: "CA" },
    ],
  },
  {
    title: "Configurações",
    navItems: [
      { href: "/export", label: "Export", shortLabel: "EX" },
      { href: "/configurations", label: "Configurations", shortLabel: "CF" },
    ],
  },
];

const renderNavIcon = (name: string) => {
  if (name === "dashboard") return <BarChartIcon sx={{fontSize: 20}} />;
  if (name === "transactions") return <AttachMoneyIcon sx={{fontSize: 20}} />;
  if (name === "goals") return <ModeStandbyIcon sx={{fontSize: 20}} />;
  if (name === "categories") return <CategoryIcon sx={{fontSize: 20}} />;
  if (name === "export") return <ImportExportIcon sx={{fontSize: 20}} />;
  if (name === "configurations") return <SettingsIcon sx={{fontSize: 20}} />;

  return null;
};

type SidebarProps = {
  user: AuthUser;
};

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-72 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white px-4 py-5">
      <div className="space-y-6">

        <div>
          <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-emerald-800">
            xFinance
          </h2>
          <p className="text-zinc-500 text-sm">
            Seu app de finanças
          </p>
        </div>
          

        
          {navSection.map((sec, i) => (
            <div key={i}>
              <h3 className="uppercase text-zinc-500 text-sm font-semibold">
                {sec.title}
              </h3>
              <nav className="space-y-1">
                 {sec.navItems.map((item) => {
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
                      {renderNavIcon(item.href.replace("/", ""))}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                    </div>
                  </Link>
                );
              })}
              </nav>
             
            </div>
          ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-950">{user.name}</p>
        <p className="text-sm text-zinc-500">{user.email}</p>
        <LogoutBtn />
      </div>
    </aside>
  );
}
