import { fetchIrsByNimBySem } from "@/data/irs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import CreateIrs from "./form";

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

  const irsSemester = await fetchIrsByNimBySem(
    no_induk,
    Number(params.semester)
  );

  return (
    <>
      <CreateIrs data={irsSemester} />
    </>
  );
}
