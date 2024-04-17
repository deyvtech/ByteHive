import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const publicPaths = ['/', '/sign-in', '/sign-up', '/tags', '/questions']    

    if (!token && !publicPaths.includes(path)) {
        // If user is not logged in and trying to access a non-public route, redirect to sign-in
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
    
    if (token && (path === '/sign-in' || path === '/sign-up')) {
        // If user is logged in and trying to access sign-in or sign-up, redirect to home
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!token && path === '/profile' && path === '/bookmarks') {
        // If user is not logged in and trying to access profile and bookmarks, redirect to sign-in
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/', '/sign-in', '/sign-up', '/profile', '/bookmarks']
};