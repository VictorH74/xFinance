import { PageTitle } from "@/components/pages/protected/PageTitle";
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
        <PageTitle title="Configurações" description="Gerencie seu perfil e preferências" />

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-zinc-500">Dados pessoais</h3>
          <p className="text-sm text-zinc-400">Atualize suas informações de perfil</p>

          <form className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 md:col-span-1">
              <span className="text-sm font-medium text-zinc-700">Nome completo</span>
              <input
                type="text"
                defaultValue="Victor Leal"
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white"
              />
            </label>

            <label className="space-y-2 md:col-span-1">
              <span className="text-sm font-medium text-zinc-700">E-mail</span>
              <input
                type="email"
                defaultValue="victor@example.com"
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white"
              />
            </label>

            <label className="space-y-2 md:col-span-1">
              <span className="text-sm font-medium text-zinc-700">Telefone</span>
              <input
                type="tel"
                defaultValue="+55 11 99999-9999"
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white"
              />
            </label>

            <label className="space-y-2 md:col-span-1">
              <span className="text-sm font-medium text-zinc-700">Fuso horario</span>
              <input
                type="text"
                defaultValue="America/Sao_Paulo"
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white"
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-zinc-700">Bio</span>
              <textarea
                defaultValue="Acompanhando metas, investimentos e gastos do dia a dia."
                rows={4}
                className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white"
              />
            </label>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Salvar dados
              </button>
            </div>
          </form>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-zinc-500">Preferências</h3>

          <form className="mt-4 space-y-5">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-zinc-700">Tema</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "light", label: "Claro", description: "Interface clara" },
                  { id: "dark", label: "Escuro", description: "Interface escura" },
                  { id: "system", label: "Dispositivo", description: "Segue o sistema" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-400"
                  >
                    <input
                      type="radio"
                      name="theme"
                      defaultChecked={option.id === "system"}
                      className="mt-1 h-4 w-4 border-zinc-300 text-zinc-950 focus:ring-zinc-400"
                    />
                    <span>
                      <span className="block text-sm font-medium text-zinc-800">{option.label}</span>
                      <span className="block text-xs text-zinc-500">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-700">Moeda padrao</span>
                <select className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white">
                  <option>BRL - Real brasileiro</option>
                  <option>USD - Dolar americano</option>
                  <option>EUR - Euro</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-zinc-700">Idioma</span>
                <select className="w-full rounded-md border border-zinc-300 bg-zinc-100 p-2.5 outline-none transition focus:border-zinc-500 focus:bg-white">
                  <option>Portugues (Brasil)</option>
                  <option>English</option>
                  <option>Espanol</option>
                </select>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Salvar preferencias
              </button>
            </div>
          </form>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-zinc-500">Conta e segurança</h3>
          <p className="text-sm text-zinc-400">
            Exclua sua conta permanentemente caso nao queira mais usar a plataforma.
          </p>

          <div className="mt-4 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-700">Excluir conta</p>
              <p className="text-sm text-red-600">
                Esta acao remove seus dados, historico e configuracoes de forma permanente.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              Excluir conta
            </button>
          </div>
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
