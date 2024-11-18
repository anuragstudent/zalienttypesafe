import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleClientSideRedirects(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Redirect authenticated users from auth routes to dashboard
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from dashboard to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
