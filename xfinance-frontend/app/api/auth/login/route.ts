import { NextResponse } from "next/server";
import {
  authCookieNames,
  createMockSession,
} from "@/lib/auth/mock-session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = String(formData.get("userId") ?? "user-1");
  const session = createMockSession(userId);

  if (!session) {
    return NextResponse.json({ error: "Invalid mock user" }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  response.cookies.set(authCookieNames.accessToken, session.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15,
  });

  response.cookies.set(authCookieNames.refreshToken, session.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
