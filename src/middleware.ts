import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  
  if (!request.cookies.has("token")) {
    let url = request.nextUrl.clone();
    if (url.pathname.includes('/explore')) {
      url.pathname = url.pathname.replace('/explore', '/explore-campaigns');
    } else {
      url.pathname = '/login';
    }
    return  NextResponse.redirect(url);
  }
  const requestHeaders = new Headers(request.headers);

  // Store current request pathname in a custom header
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

// "Matching Paths"
export const config = {
  matcher: [
    "/confirmation",
    "/dashboard",
    "/register-organization",
    "/explore",
    "/explore/(.*)",
    "/campaigns",
    "/campaigns/create-or-edit-campaign",
    "/campaigns/create-or-edit-campaign/[id]",
    "/donations",
    "/inbox",
    "/manage-webpage",
    "/settings/(.*)",
    "/admin/(.*)"
  ]
};
