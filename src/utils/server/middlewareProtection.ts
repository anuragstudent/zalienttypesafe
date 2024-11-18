import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleServerSideProtection(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authorizationHeader = request.headers.get("authorization");

  // Allow unprotected routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check for the token in the Authorization header
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({ error: true, message: "Unauthorized access" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Extract the token by removing the "Bearer " prefix
  const token = authorizationHeader.replace("Bearer ", "");

  // Validate the token
  if (token !== "anurag") {
    return new NextResponse(
      JSON.stringify({ error: true, message: "Unauthorized access" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.next();
}
