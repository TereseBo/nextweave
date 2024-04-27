import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/','/weaver','/weaver/:path*'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};