import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resolveMockSession } from "@/lib/auth/mock-session";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = await resolveMockSession({
    accessToken: cookieStore.get("xfinance.access_token")?.value,
    refreshToken: cookieStore.get("xfinance.refresh_token")?.value,
  });

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
          Mock JWT login
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          This screen simulates a real authentication flow with `httpOnly`
          cookies, access token validation, refresh token fallback, and user
          loading on the server.
        </p>

        <form action="/api/auth/login" method="post" className="mt-8 space-y-4">
          <input type="hidden" name="userId" value="user-1" />
          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Sign in as demo user
          </button>
        </form>
      </div>
    </main>
  );
}
