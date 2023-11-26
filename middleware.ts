import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const session = await supabase.auth.getSession();
  const urlSegment = req.url.split("/")[3];
  const role = session?.data?.session?.user?.user_metadata?.role;
  const no_hp = session?.data?.session?.user?.user_metadata?.no_hp;

  if (urlSegment === "operator") {
    if (role === "operator") {
      return res;
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (urlSegment === "mhs") {
    if (role === "mahasiswa") {
      if (!no_hp && !req.nextUrl.pathname.endsWith("/mhs/profile")) {
        return NextResponse.redirect(new URL("/mhs/profile", req.url));
      } else {
        return res;
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (urlSegment === "dosen") {
    if (role === "dosen") {
      return res;
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (urlSegment === "departemen") {
    if (role === "departemen") {
      return res;
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
