import CreateIrs from "./form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchIrsByNim } from "@/data/irs";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const irsData = await fetchIrsByNim(session!.user.user_metadata.no_induk);

  return (
    <>
      <CreateIrs data={irsData} />
    </>
  );
}
