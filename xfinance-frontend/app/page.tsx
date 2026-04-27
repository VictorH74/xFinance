import { redirect } from "next/navigation";
import { resolveSessionFromCookies } from "@/lib/modules/auth/domain/auth.actions";

export default async function Home() {
  const session = await resolveSessionFromCookies();

  redirect(session ? "/dashboard" : "/auth/login");
}
