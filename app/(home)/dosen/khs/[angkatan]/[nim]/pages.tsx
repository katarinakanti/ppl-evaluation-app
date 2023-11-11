import { fetchKhsByNim } from "@/data/khs";
import { mapAngkatanAndSmtToWord } from "@/utils/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({
params,
}: {
params: { angkatan : string, nim: string};
})  {
const supabase = createServerComponentClient<Database>({ cookies });
const {
data: { session },
} = await supabase.auth.getSession();
const no_induk = params.nim;
const angkt = "20" + no_induk.substring(6, 8);

const khsData = await fetchKhsByNim(params.nim);
return (
    <div>
        <br />
        <br />
        <h1 className="text-center text-4xl font-bold font-arial">
        Kartu Hasil Studi (KHS)- Angkatan {params.angkatan}
        </h1>
        <br />
        <br />
        <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">KHS</p>
        </div>
        <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
            <div className="flex-col flex w-11/12">
            {khsData.sort((a, b) => a.semester - b.semester).map((data) => (
                <div className="flex w-full mb-8" key={data.semester}>
                <div className="flex items-center justify-center bg-gray-300 w-14 h-20 p-4">
                
                </div>
                <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                    <div>
                    <Link href={`/dosen/khs/${params.angkatan}/${data.nim}/${data.semester}`}>
                        <p className="text-lg mb-1 font-sans font-semibold text-left">
                        Semester {data.semester} | Tahun Ajaran{" "}
                        {mapAngkatanAndSmtToWord(
                            Number(angkt),
                            data.semester
                        )}
                        </p>
                        <p className="text-sm font-sans font-extralight">
                        Jumlah SKS Semester {data.sks_semester}
                        </p>
                        <p className="text-sm font-sans font-extralight">
                        Status verifikasi:{" "}
                        {data.status_verifikasi_id === 1
                            ? "Belum diverifikasi"
                            : "Sudah diverifikasi"}
                        </p>
                    </Link>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    );
}
