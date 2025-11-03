import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest){
  const token = request.cookies.get('token'); 

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/home');

  // if (isProtectedRoute && !token) {
  //     return NextResponse.redirect(new URL('/', request.url));
  // }
  
  // if (request.nextUrl.pathname === '/' && token) {
  //    return NextResponse.redirect(new URL('/home', request.url));
  // }
  
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/home/:path*', '/home']
}
