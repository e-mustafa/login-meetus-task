import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('access_token')?.value;
	const pathname = request.nextUrl.pathname;

	// Protected routes
	if (pathname.startsWith('/dashboard')) {
		if (!token) {
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}
	}

	// Auth routes (login/register)
	if (pathname.startsWith('/auth')) {
		if (token) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*'],
};
