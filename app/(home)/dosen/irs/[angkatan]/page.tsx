import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchMhsByNipByAngkt } from "@/data/dosen";
import Link from "next/link";

export default async function Page({
    params,
  }: {
    params: { angkatan: number };
  }) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    const MhsPerAngkatan = await fetchMhsByNipByAngkt(
      session!.user.user_metadata.no_induk,
      Number(params.angkatan)
    );

return (
<>
    <link rel="stylesheet" href="view.css" />
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Isian Rencana Semester (IRS) - Angkatan {params.angkatan}</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">IRS</p>
    
    </div>
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex-col items-center">
        <div className="flex-col ml-8 mb-10">
            <div className="flex w-full">
                <div className="mt-10">
                    <p className="text-xl flex items-center font-semibold">
                        Angkatan {params.angkatan}
                    </p>
                    <div className="flex">
                        <p className="text-sm flex items-center mt-5">Jumlah Mahasiswa Perwalian Anda : 170</p>
                        <p className="ml-12 text-sm flex items-center mt-5">Sudah PKL : 2</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-10 mb-10 mr-12">
                <input className="p-2 border border-gray-300 bg-white" type="search" name="search" id="search" placeholder="Cari Nama/Nim" />
            </div>

            {MhsPerAngkatan.map((data) => (
                <div className="flex w-full pb-10">
                <div className="items-center justify-center bg-gray-300 w-14 h-20 p-4"></div> 
                <div className="flex items-center bg-gray-200 w-11/12 h-20 p-4">
                    <Link href={`/dosen/irs/${params.angkatan}/${data.nim}`}>
                    <p className="text-lg mb-1 font-sans font-semibold text-left">
                        {data.nama}
                    </p>
                    <p className="text-sm font-sans font-extralight">
                    NIM : {data.nim}  |    Jumlah Total SKS : 100    |     IPK  : 4.00
                    </p>
                    </Link>                    
                </div>
            </div>
            ))}

        </div>
    </div>
    </div>
</>
);
}
