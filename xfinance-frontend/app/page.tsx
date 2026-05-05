import { redirect } from "next/navigation";
import { resolveSessionFromCookies } from "@/lib/modules/auth/domain/auth.actions";

export default async function Home() {
  const session = await resolveSessionFromCookies();

  redirect(session ? "/dashboard" : "/auth/login");
}

// TODO: implement add goal, category and transaction
// TODO: implement update goal, category, transaction and user
// TODO: implement data fetching loading and error handlers to goal, category and transaction