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

  const nama = "Dr. Eng. Adi Wibowo, S.Si., M.Kom.";
  const no_induk = "198203092006041002";
  const role = "dosen";

  await supabase.auth.admin.createUser({
    email: `${no_induk}@maildrop.cc`,
    password: "12345678",
    email_confirm: true,
    user_metadata: {
      nama,
      no_induk,
      role,
    },
  });

  // also write to database on 'operator' table with column 'nip' = no_induk and nama
  await supabase.from("dosen").insert([
    {
      nip: no_induk,
      nama,
    },
  ]);

  return NextResponse.json({ message: "ok" });
}
