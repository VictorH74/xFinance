import { redirect } from "next/navigation";
import Sidebar from "@/components/pages/protected/protected-root/Sidebar";
import React from "react";
import { QueryProvider } from "@/components/pages/protected/protected-root/QueryProvider";
import { resolveSessionFromCookies } from "@/lib/modules/auth/domain/auth.actions";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await resolveSessionFromCookies()

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
