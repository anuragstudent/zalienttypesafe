import { handleClientSideRedirects } from "@/utils/client/middlewareRedirects";
import { handleServerSideProtection } from "@/utils/server/middlewareProtection";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply client-side redirect logic for /auth and /dashboard routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard")) {
    return handleClientSideRedirects(request);
  }

  // Apply server-side protection for API routes
  if (pathname.startsWith("/api/")) {
    return handleServerSideProtection(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/api/:path*"],
};
