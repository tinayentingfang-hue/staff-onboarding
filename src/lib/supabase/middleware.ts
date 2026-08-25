import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Next.js fires background prefetch requests for links in/near the
  // viewport. Letting those hit Supabase's session refresh concurrently
  // with a "real" navigation causes them to race over the same (single-use,
  // rotating) refresh token — the loser gets treated as a stale session and
  // bounced. Prefetches are discarded/cached client-side and never shown as
  // the actual page, so they don't need an auth check at all.
  const isPrefetch =
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch";
  if (isPrefetch) return NextResponse.next({ request });

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname.startsWith("/auth");

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return withCookies(NextResponse.redirect(url), response);
  }

  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/modules";
    return withCookies(NextResponse.redirect(url), response);
  }

  return response;
}

// getUser() above can rotate the session and stash the new cookies onto
// `response` via setAll(). Redirect responses are separate objects, though —
// without copying those cookies over, a refresh happening on the same
// request as a redirect gets silently dropped, leaving the browser holding
// an already-rotated (now invalid) refresh token that fails on the very
// next request. That produces an intermittent login/redirect bounce.
function withCookies(target: NextResponse, source: NextResponse) {
  source.cookies.getAll().forEach((cookie) => target.cookies.set(cookie));
  return target;
}
