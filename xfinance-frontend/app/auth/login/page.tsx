import { redirect } from 'next/navigation';
import { ClientLoginForm } from '../../../components/pages/auth/ClientLoginForm';
import { resolveSessionFromCookies } from '@/lib/modules/auth/domain/auth.actions';

export default async function LoginPage() {
  const session = await resolveSessionFromCookies()

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
          xFinance
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
          Login
        </h1>

        <ClientLoginForm />
      </div>
    </main>
  );
}
