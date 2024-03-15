import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/:path*','/'],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
