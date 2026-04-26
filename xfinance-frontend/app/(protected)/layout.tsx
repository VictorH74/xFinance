import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resolveMockSession } from "@/lib/auth/mock-session";
import Sidebar from "@/components/pages/protected/protected-root/Sidebar";
import React from "react";
import { QueryProvider } from "@/components/pages/protected/protected-root/QueryProvider";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await resolveMockSession({
    accessToken: cookieStore.get("xfinance.access_token")?.value,
    refreshToken: cookieStore.get("xfinance.refresh_token")?.value,
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto flex min-h-screen">
        <Sidebar user={session.user} />
        <QueryProvider>
          <div className="min-w-0 flex-1">{children}</div>
        </QueryProvider>
      </div>
    </div>
  );
}
