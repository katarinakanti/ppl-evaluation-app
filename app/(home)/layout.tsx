import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthNavbar, NonAuthNavbar } from "@/components/Navbar";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const metadata = user?.user_metadata;

  return (
    <>
      {session ? <AuthNavbar /> : <NonAuthNavbar />}
      {metadata && metadata.role === "admin" && (
        <Link className="bg-blue-200 m-2 p-2" href="/operator/generate">
          Generate Mahasiswa
        </Link>
      )}
      {children}
    </>
  );
}
