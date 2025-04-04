import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes that require authentication
const protectedRoutes = ["/review", "/history"];

// Define public routes that don't require authentication
const publicRoutes = ["/auth/signin", "/auth/signup"];

export async function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some((route) => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  const isAuthenticated = !!token;
  
  // If the route is protected and the user is not authenticated, redirect to signin
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // If the user is authenticated and trying to access public routes like signin/signup,
  // redirect to home page
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure matching paths for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)"
  ],
}; 