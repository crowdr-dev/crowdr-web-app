import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!request.cookies.has("token")) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  const requestHeaders = new Headers(request.headers);

  // Store current request pathname in a custom header
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/confirmation",
    "/dashboard",
    "/register-organization",
    "/explore",
  ],
};
