import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>(
    {
      cookies,
    },
    { supabaseKey: process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY }
  );

  // await supabase.auth.admin.createUser({
  //   email: "yoshi@maildrop.cc",
  //   password: "12345678",
  //   email_confirm: true,
  //   user_metadata: {
  //     nama: "Operator",
  //     no_induk: "123",
  //     role: "operator",
  //   },
  // });

  return NextResponse.json({ message: "ok" });
}
