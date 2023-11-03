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
    <h2>Skripsi-Angkatan 2019</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">Skripsi</p>
    
    </div>
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col items-center">
            <div className="flex-col ml-14">
                <div className="flex w-full">
                    <div className="mt-16">
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

            <div className="mt-10">
                <div className="flex ml-14">
                    <div className="flex w-full">
                        <div className="mt-5">
                            <div className="flex">
                                <p className="font-semibold">Dosen Pembimbing</p>
                                <div className="flex ml-24">:
                                    <p className="ml-10">Guruh Aryotejo, S.Kom., M.Sc.</p>       
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex ml-14">
                    <div className="flex w-full">
                        <div className="mt-5">
                            <div className="flex">
                                <p className="font-semibold">Waktu</p>
                                <div className="flex ml-48">:
                                    <p className="ml-10">6 bulan</p>       
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex ml-14">
                    <div className="flex w-full">
                        <div className="mt-5">
                            <div className="flex">
                                <p className="font-semibold">Status</p>
                                <div className="flex ml-48">:
                                    <p className="ml-10">Sudah Skripsi</p>       
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex ml-14">
                    <div className="flex w-full">
                        <div className="mt-5">
                            <div className="flex">
                                <p className="font-semibold">Nilai</p>
                                <div className="flex ml-52">:
                                    <p className="ml-10">A</p>       
                                </div>                
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div className="flex mt-10 justify-end mr-16">
            <button className="bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-7 py-1 font-semibold rounded mb-5">Ubah</button>
            <button className=" ml-5 bg-green-600 hover:bg-green-400 text-white  px-7 py-1 font-semibold rounded mb-5">Approved</button>
        </div>
    </div>
</>
);
}