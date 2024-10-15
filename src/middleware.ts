import { NextResponse } from "next/server";
import * as clerk from "@clerk/nextjs/server";

export default clerk.authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/dashboard",
    "/about",
    "/contact",
    "/api/send-email",
    "/help",
  ],
  ignoredRoutes: ["/api/webhook"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      const notFoundPath = "/not-found";
      const notFoundUrl = new URL(notFoundPath, req.url);

      const requestedPath = new URL(req.url).pathname;
      const pathExists = [
        "/dashboard",
        "/workout-plan",
        "/custom-workout",
        "/exercise-details",
        "/nutrition-advice",
        "/analyze-food",
        "/profile",
      ].includes(requestedPath);

      if (!pathExists) {
        return NextResponse.rewrite(notFoundUrl);
      }

      // If the path exists but the user is not authenticated, redirect to sign-in
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
