import DepartemenDashboard from "@/components/dashboard/departemen";
import DosenDashboard from "@/components/dashboard/dosen";
import MahasiswaDashboard from "@/components/dashboard/mahasiswa";
import OperatorDashboard from "@/components/dashboard/operator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user.user_metadata.role;

  return (
    <>
      {role === "dosen" && <DosenDashboard session={session} />}
      {role === "mahasiswa" && <MahasiswaDashboard session={session} />}
      {role === "operator" && <OperatorDashboard session={session} />}
      {role === "departemen" && <DepartemenDashboard session={session} />}
    </>
  );
}
