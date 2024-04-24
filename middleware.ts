import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/weaver/calculator','/weaver/draft'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
