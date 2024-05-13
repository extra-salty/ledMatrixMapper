import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Routes } from './misc/hooks/useRoutes/useRoutes';

export function middleware(request: NextRequest) {
	return NextResponse.redirect(new URL(Routes.Home, request.url));
}

export const config = {
	matcher: '/',
};
