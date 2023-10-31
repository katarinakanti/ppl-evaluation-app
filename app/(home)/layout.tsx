export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  DeptNavbar,
  DosenNavbar,
  MhsNavbar,
  NonAuthNavbar,
  OpNavbar,
} from "@/components/Navbar";
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

  const getNavbar = (role: string) => {
    switch (role) {
      case "mahasiswa":
        return <MhsNavbar />;
      case "operator":
        return <OpNavbar />;
      case "dosen":
        return <DosenNavbar />;
      case "departemen":
        return <DeptNavbar />;
      default:
        return <NonAuthNavbar />;
    }
  };

  return (
    <>
      {getNavbar(role)}
      {children}
    </>
  );
}
