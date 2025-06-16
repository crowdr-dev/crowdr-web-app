import { NextResponse, NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  if (!request.cookies.has("token")) {
    if (url.pathname.includes("/explore")) {
      url.pathname = url.pathname.replace("/explore", "/explore-campaigns")
    } else {
      url.pathname = "/login"
    }
    return NextResponse.redirect(url)
  }

  // Get the first segment after the leading slash
  const [, segment, ...rest] = url.pathname.split("/")

  // Redirect /{dashboardRoute}/* to /dashboard/{dashboardRoute}/*
  // This is to redirect due to putting dashboard under /dashboard route
  // This is temporary, will be removed after some time
  console.log(segment)
  if (dashboardRoutes.includes(segment)) {
    url.pathname = `/dashboard/${segment}${
      rest.length ? "/" + rest.join("/") : ""
    }`
    return NextResponse.redirect(url)
  }

  // Store current request pathname in a custom header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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
    "/campaigns/(.*)", // <-- Add this line to match all /campaigns/* routes
    "/donations",
    "/donations/(.*)",
    "/inbox",
    "/manage-webpage",
    "/settings/(.*)",
    "/admin/(.*)",
  ],
}

const dashboardRoutes = ["campaigns", "donations", "settings"]
