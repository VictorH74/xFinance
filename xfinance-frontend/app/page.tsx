import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resolveMockSession } from "@/lib/auth/mock-session";

export default async function Home() {
  const cookieStore = await cookies();
  const session = await resolveMockSession({
    accessToken: cookieStore.get("xfinance.access_token")?.value,
    refreshToken: cookieStore.get("xfinance.refresh_token")?.value,
  });

  redirect(session ? "/dashboard" : "/auth/login");
}
