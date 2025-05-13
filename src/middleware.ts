import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // const token = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // console.log(token)
  // console.log(req.headers.get('cookie'))
  // console.log(process.env.NEXTAUTH_SECRET)

  // if (!token) {
  //   return NextResponse.json(
  //     { message: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secure/:path*"],
};
