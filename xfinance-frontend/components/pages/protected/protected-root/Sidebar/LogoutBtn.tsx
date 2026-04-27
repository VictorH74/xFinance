import { logoutAction } from "@/lib/modules/auth/domain/auth.actions";
import { useActionState } from "react";

export const LogoutBtn = () => {
    const [state, action, isPending] = useActionState(logoutAction, null);

  return (
    <form action={action} className="mt-4">
      <button
        type="submit"
        className="w-full rounded-xl bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 uppercase"
      >
        {isPending ? "Saíndo..." : "Sair"}
      </button>
    </form>
  );
};
