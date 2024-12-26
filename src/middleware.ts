import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_jwt_secret');

export async function middleware(request: NextRequest) {
  // Define the paths that require authentication
  const protectedRoutes = ['/dashboard', '/sell', '/searchresults','/','/mybids'];

  // Check if the request is to a protected route
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const tokenObj = request.cookies.get('token');

    console.log('[Middleware] Request Path:', request.nextUrl.pathname);
    console.log('[Middleware] Fetched Token Object:', tokenObj);

    if (!tokenObj || !tokenObj.value) {
      console.log('[Middleware] No token found or token value is empty. Redirecting to /auth/signin.');
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const token = tokenObj.value; // Extract the value from the token object
    console.log('[Middleware] Token Value:', token);

    try {
      // Verify the token using jose
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log('[Middleware] Token Verified Successfully:', payload);
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId as string); // Assuming userId is in the payload
      return response;
    } catch (error) {
      console.error('[Middleware] Invalid token:', error);
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  console.log('[Middleware] Passing through successfully.');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sell/:path*', '/searchresults/:path*','/','/mybids'], // Apply middleware to protected routes
};
