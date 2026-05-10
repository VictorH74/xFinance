"use client";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { twMerge } from "tailwind-merge";
import React from "react";
import { DashboardFilters } from "@/components/shared/DashboardFilters";
import { DashboardFilters as DashboardFiltersT } from "@/modules/dashboard/domain/dashboard.types";
import {
  loadDashboardFilters,
  saveDashboardFilters,
} from "@/modules/dashboard/domain/dashboard-filter.utils";
import { useCategories } from "@/modules/categories/domain/category.queries";

const exportFormats = [
  {
    title: "Relatório PDF",
    description:
      "Gráficos + tabela de transações formatados para impressão ou compartilhamento",
    format: "PDF",
    Icon: InsertDriveFileIcon,
    iconClassname: "text-red-600",
    hihglight: true,
    aosDelay: 0
  },
  {
    title: "Gráfico como imagem",
    description:
      "PNG de alta resolução do dashboard ou gráfico específico para usar em apresentações",
    format: "PNG",
    Icon: ImageIcon,
    iconClassname: "text-blue-400",
    hihglight: true,
    aosDelay: 100
  },
  {
    title: "Dados em CSV",
    description:
      "Transações brutas em formato CSV compatível com qualquer ferramenta de análise",
    format: "CSV",
    iconClassname: "text-cyan-600",
    Icon: AssignmentIcon,
    aosDelay: 200
  },
  {
    title: "Planilha Excel",
    description:
      "Arquivo .xlsx com abas separadas por categoria, resumo mensal e gráficos embutidos",
    format: ".xlsx",
    iconClassname: "text-green-600",
    Icon: AssessmentIcon,
    aosDelay: 300
  },
];

export const ClientChildren = () => {
  const [filters, setFilters] = React.useState<DashboardFiltersT | null>(null);
  const { data: categories } = useCategories();

  React.useEffect(() => {
    setFilters(loadDashboardFilters());
  }, []);

  React.useEffect(() => {
    if (!filters) return;
    saveDashboardFilters(filters);
  }, [filters]);

  return (
    <>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Filtrar antes de exportar</h3>
        <DashboardFilters
          filters={filters ?? {}}
          onChange={(nextFilters) => setFilters(nextFilters)}
          categories={categories}
        />
      </div>

      <section className="grid gap-6 ">
        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Formatos disponíveis</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Escolha a saída que melhor se adapta ao seu fluxo de trabalho.{" "}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {exportFormats.map(
              ({
                Icon,
                description,
                format,
                title,
                hihglight,
                iconClassname,
                aosDelay
              }) => (
                <button
                  key={format}
                  className="rounded-2xl border border-zinc-200 p-5 space-y-3 hover:-translate-y-2 duration-200 hover:shadow-md cursor-pointer hover:border-emerald-500"
                  data-aos="zoom-in"
                  data-aos-delay={aosDelay}
                >
                  <Icon sx={{ fontSize: 40 }} className={iconClassname} />
                  <h3 className="text-lg text-zinc-500 font-semibold">
                    {title}
                  </h3>
                  <p className="text-zinc-400 text-base">{description}</p>
                  <div
                    className={twMerge(
                      "font-semibold text-zinc-500 border border-zinc-400 rounded-md px-4 py-2",
                      hihglight && "bg-emerald-500 text-white border-none",
                    )}
                  >
                    Exportar {format}
                  </div>
                </button>
              ),
            )}
          </div>
        </article>
      </section>
    </>
  );
};
