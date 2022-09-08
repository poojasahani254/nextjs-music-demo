import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/artists"];

export default function middleware(req: NextRequest) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("DEMO_ACCESS_TOKEN");
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signIn";
      return NextResponse.redirect(url);
    }
  }
}
