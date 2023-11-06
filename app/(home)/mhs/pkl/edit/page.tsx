import { fetchPklByNim } from "@/data/pkl";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdatePkl from "./form";
import { fetchAllDosen } from "@/data/dosen";

export default async function Page({
  params,
}: {
  params: { semester: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const no_induk = session?.user.user_metadata.no_induk;

  const pkl = await fetchPklByNim(no_induk);
  const dosen = await fetchAllDosen();

  return (
    <>
      <UpdatePkl data={pkl} dosen={dosen} />
    </>
  );
}
