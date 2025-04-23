import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/auth/token";

const PROTECTED_PATHS = ["/management"];
const EXCLUDED_PATHS = ["/management/login", "/management/join"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected || isExcluded) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("Authorization");
  console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const loginUrl = new URL("/management/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const token = authorization.split(" ")[1];
  if (!token || isTokenExpired(token) || isManagerRole(token)) {
    console.log("hi");
    const loginUrl = new URL("/management/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/management/:path*"],
};
