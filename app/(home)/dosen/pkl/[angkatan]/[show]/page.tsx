import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

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

return (
<>
    <link rel="stylesheet" href="view.css" />
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Praktek Kerja Lapangan (PKL)-Angkatan 2019</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">PKL</p>
    
    </div>
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex-col items-center">
        <div className="flex-col ml-8">
            <div className="flex w-full">
                <div className="mt-10">
                    <p className="text-xl flex items-center font-semibold">
                        Abigail Metanoia Melody
                    </p>
                    <div className="flex">
                        <p className="text-sm flex items-center mt-5">NIM : 24060121120038</p>
                        <p className="ml-12 text-sm flex items-center mt-5">Jumlah Total SKS : 100</p>
                        <p className="ml-12 text-sm flex items-center mt-5">IPK : 4.00</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex items-center">
            <div className="flex w-full">
                <div>
                <p className="flex items-center w-60 p-10 font-semibold">Dosen Pembimbing</p>              
                </div>
                <div className="flex items-center ml-10"> :
                    <p className="ml-10 w-80 p-2">Guruh Aryotejo, S.Kom., M.Sc.</p>       
                </div>
            </div>
        </div>
        <div className="flex w-full">
            <p className="flex items-center w-60 p-10 font-semibold">Waktu</p>
            <div className="flex items-center ml-80" > :
                    <p className="ml-10 w-80 p-2 ">2</p>
            </div>
            </div>

            <div className="flex w-full -mt-10">
            <p className="flex items-center w-60 p-10 font-semibold">Status</p>
            <div className="flex items-center ml-80" > :
            <p className="ml-10 w-80 p-2">Sudah PKL</p>
            </div>
            </div>

            <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
                <div className="flex items-center ml-80" > :
                <p className="ml-10 w-80 p-2">A</p>
            </div>
        </div> 
    </div>
    </div>
</>
);
}

