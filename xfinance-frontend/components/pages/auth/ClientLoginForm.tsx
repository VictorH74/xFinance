"use client";

import { loginAction } from "@/lib/modules/auth/domain/auth.actions";
import { useActionState } from "react";

export const ClientLoginForm = () => {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-8 space-y-4">
      <input name="email" type="email" className="border border-zinc-400 rounded-md w-full p-2 text-zinc-700" placeholder="Seu email" />
      <input name="password" type="password"  className="border border-zinc-400 rounded-md w-full p-2 text-zinc-700" placeholder="Sua senha"/>

      {state?.error && <p className="text-sm text-red-700 font-medium">{state.error}</p>}

      <button
        disabled={isPending}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};
