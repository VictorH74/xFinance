import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authCookieNames } from "./lib/modules/auth/domain/auth.data";
import { resolveSessionFromCookies } from "./lib/modules/auth/domain/auth.actions";

const protectedRoutes = [
  "/dashboard",
  "/transactions",
  "/categories",
  "/goals",
  "/export",
  "/configurations",
];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await resolveSessionFromCookies()

  if (pathname === "/") {
    const destination = session ? "/dashboard" : "/auth/login";
    const response = NextResponse.redirect(new URL(destination, request.url));

    if (session?.refreshToken) {
      response.cookies.set(
        authCookieNames.accessToken,
        session.refreshToken,
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 15,
        },
      );
    }

    return response;
  }

  if (pathname === "/auth/login" && session) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    if (session.refreshToken) {
      response.cookies.set(
        authCookieNames.accessToken,
        session.refreshToken,
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 15,
        },
      );
    }

    return response;
  }

  if (isProtectedPath(pathname) && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session?.refreshToken) {
    const response = NextResponse.next();

    response.cookies.set(
      authCookieNames.accessToken,
      session.refreshToken,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 15,
      },
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/dashboard/:path*",
    "/transactions/:path*",
    "/categories/:path*",
    "/goals/:path*",
    "/export/:path*",
    "/configurations/:path*",
  ],
};
