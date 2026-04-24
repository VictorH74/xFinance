import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authCookieNames, resolveMockSession } from "@/lib/auth/mock-session";

export async function GET() {
  const cookieStore = await cookies();
  const session = await resolveMockSession({
    accessToken: cookieStore.get(authCookieNames.accessToken)?.value,
    refreshToken: cookieStore.get(authCookieNames.refreshToken)?.value,
  });

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const response = NextResponse.json({ user: session.user });

  if (session.refreshedAccessToken) {
    response.cookies.set(
      authCookieNames.accessToken,
      session.refreshedAccessToken,
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
