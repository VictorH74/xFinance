"use server"
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export async function proxyFetch(path: string, options?: RequestInit) {
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  let res = await apiFetch(path, {
    headers: { "Content-Type": "application/json" },
    // body: req.method !== "GET" ? await req.text() : undefined,
    ...options,
  });

  // 🔥 2. se expirou → tenta refresh
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      return new Response("Unauthorized", { status: 401 });
    }

    const newTokens = await refreshRes.json();

    // 🔥 atualiza cookies
    (await cookies()).set("access_token", newTokens.accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    (await cookies()).set("refresh_token", newTokens.refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    // 🔁 retry da request original
    res = await apiFetch(path, {
      headers: { "Content-Type": "application/json" },
      // body: req.method !== "GET" ? await req.text() : undefined,
      ...options,
    });
  }

  return res;
}
