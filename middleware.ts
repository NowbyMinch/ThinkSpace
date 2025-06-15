import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest){
    const token = request.cookies.get('token'); 
    console.log(token)

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/home');
    const landingpage = request.nextUrl.pathname === '/';

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (landingpage && token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    
    return NextResponse.next();
};

export const config = {
  matcher: ['/home/:path*', '/home']
}