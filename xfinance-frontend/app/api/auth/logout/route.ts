import { NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/mock-session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/auth/login", request.url));

  response.cookies.set(authCookieNames.accessToken, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set(authCookieNames.refreshToken, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
