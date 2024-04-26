import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/','/weaver/:path*','/weaver'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
