import {
  clerkMiddleware,
ClerkMiddlewareAuth,
  createRouteMatcher} from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/api/[userId](.*)',
]);

export default clerkMiddleware((auth: ClerkMiddlewareAuth, request:NextRequest) => {
  if (isProtectedRoute(request)) auth().protect();
}, { debug:false });

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};