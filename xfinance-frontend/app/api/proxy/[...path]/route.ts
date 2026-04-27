import { proxyFetch } from "@/lib/server/proxyFetch";
import { NextRequest, NextResponse } from "next/server";

async function handler(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const { path } = await params;

  const pathStr = "/" + path.join("/");
  const search = req.nextUrl.search;

  console.log("PROXY PATH", `${pathStr}${search}`)

  const res =  await proxyFetch(`${pathStr}${search}`, {
    method: req.method,
    body: req.body,
  });

  // const accessToken = (await cookies()).get("access_token")?.value;
  // const refreshToken = (await cookies()).get("refresh_token")?.value;

  // let res = await apiFetch(`${pathStr}${search}`, {
  //   method: req.method,
  //   headers: { "Content-Type": "application/json" },
  //   body: req.method !== "GET" ? await req.text() : undefined,
  // });

  // // 🔥 2. se expirou → tenta refresh
  // if (res.status === 401 && refreshToken) {
  //   const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ refreshToken }),
  //   });

  //   if (!refreshRes.ok) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  //   const newTokens = await refreshRes.json();

  //   // 🔥 atualiza cookies
  //   (await cookies()).set("access_token", newTokens.accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //     path: "/",
  //   });

  //   (await cookies()).set("refresh_token", newTokens.refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     path: "/",
  //   });

  //   // 🔁 retry da request original
  //   res = await apiFetch(`${pathStr}${search}`, {
  //     method: req.method,
  //     headers: { "Content-Type": "application/json" },
  //     body: req.method !== "GET" ? await req.text() : undefined,
  //   });
  // }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
