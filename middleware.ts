import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Définir les routes publiques
const isPublicRoute = (req: NextRequest) => {
  const publicRoutes = ["/","/sign-in", "/api/webhook"];
  return publicRoutes.includes(req.nextUrl.pathname);
};

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();
  const isPublic = isPublicRoute(req);

  console.log("PATHNAME:", req.nextUrl.pathname);
  console.log("userId:", userId);
  console.log("orgId:", orgId);

  // Rediriger vers l'organisation si connecté et sur route publique
  if (userId && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = orgId ? `/organization/${orgId}` : "/select-org";

    return NextResponse.redirect(url);
  }

  // Rediriger vers /sign-in si l'utilisateur n'est pas connecté et la route est privée
  if (!userId && !isPublic) {
    console.log("➡️ Redirecting to sign-in");
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // Pour revenir après connexion
    return NextResponse.redirect(signInUrl);
  }

  // Rediriger vers /select-org si connecté mais pas d'organisation sélectionnée
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    console.log("➡️ Redirecting from public to org/select-org");
    const url = req.nextUrl.clone();
    url.pathname = "/select-org";
    return NextResponse.redirect(url);
  }

  // 3. Connecté mais pas d’orgId → redirige vers /select-org si pas déjà dessus
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    console.log("➡️ Redirecting to select-org");
    const url = req.nextUrl.clone();
    url.pathname = "/select-org";
    return NextResponse.redirect(url);
  }

  // Sinon, laisser passer
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// export const config = {
//   matcher: [
//     '/',                  // Home
//     '/sign-in',           // Login page
//     '/select-org',        // Org selection
//     '/organization/:path*', // Org-specific pages
//     '/api/:path*',        // APIs
//     '/((?!_next|.*\\..*).*)', // Everything else that’s not static
//   ],
// };
