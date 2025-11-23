import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname, origin } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(`${origin}/login`);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api/auth|favicon.ico).*)"],
};
