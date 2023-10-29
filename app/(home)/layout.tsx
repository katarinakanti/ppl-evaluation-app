import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { MhsNavbar, NonAuthNavbar, OpNavbar } from "@/components/Navbar";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const role = session?.user.user_metadata.role;

  return (
    <>
      {session ? (
        role === "mahasiswa" ? (
          <MhsNavbar />
        ) : role === "operator" ? (
          <OpNavbar />
        ) : (
          <NonAuthNavbar />
        )
      ) : (
        <NonAuthNavbar />
      )}

      {children}
    </>
  );
}
