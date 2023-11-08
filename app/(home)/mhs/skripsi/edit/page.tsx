import { fetchSkripsiByNim } from "@/data/skripsi";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdateSkripsi from "./form";
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

    const skripsi = await fetchSkripsiByNim(no_induk);
    const dosen = await fetchAllDosen();

    return (
        <>
        <UpdateSkripsi data={skripsi} dosen={dosen} />
        </>
    );
}
