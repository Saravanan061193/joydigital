import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host');
  if (host === 'joydigital.vercel.app') {
    return NextResponse.redirect(`https://joydigital.in${request.nextUrl.pathname}${request.nextUrl.search}`, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
