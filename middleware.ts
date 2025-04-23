import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isManagerRole, isTokenExpired } from "./utils/auth/token";

const PROTECTED_PATHS = ["/management"];
const EXCLUDED_PATHS = ["/management/login", "/management/join"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected || isExcluded) {
    return NextResponse.next();
  }

  const managerToken = request.cookies.get("managerToken");

  if (
    !managerToken ||
    isTokenExpired(managerToken.value) ||
    !isManagerRole(managerToken.value)
  ) {
    const loginUrl = new URL("/management/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/management/:path*"],
};
