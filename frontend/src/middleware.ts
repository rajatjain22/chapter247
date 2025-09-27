import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;
    const publicPaths = ["/signin", "/signup"];

    if (pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    const isPublicPath = publicPaths.includes(pathname);
    const isAuthenticated = Boolean(token);

    if (isAuthenticated && isPublicPath) {
        return NextResponse.redirect(new URL("/", origin));
    }

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL("/signin", origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signin", "/signup", "/profile"],
};
