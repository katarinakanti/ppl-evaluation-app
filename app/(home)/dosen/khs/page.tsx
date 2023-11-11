import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchMhsByNip } from "@/data/dosen";
import { groupMahasiswaByAngkatan } from "@/utils/functions";
import Link from "next/link";

export default async function Page() {
const supabase = createServerComponentClient<Database>({ cookies });
const {
data: { session },
} = await supabase.auth.getSession();

const MhsData = await fetchMhsByNip(session!.user.user_metadata.no_induk);

const MhsDataNumber = MhsData.map((mahasiswa) => ({
angkatan: Number(mahasiswa.angkatan),
}));
const groupAngkatan = groupMahasiswaByAngkatan(MhsDataNumber);
return (
    <div>
        <br />
        <br />
        <h1 className="text-center text-4xl font-bold font-arial">
        Kartu Hasil Studi (KHS)
        </h1>
        <br />
        <br />
        <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">KHS</p>
        </div>

        <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
            <div className="flex-col flex w-11/12">
            {Object.keys(groupAngkatan).map((angkatan) => {
                const angkatanNumber = parseInt(angkatan, 10); // Mengonversi string ke number
                return (
                <div className="flex w-full mb-8" key={angkatanNumber}>
                    <div className="text-2xl font-semibold flex items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                    <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                    <div>
                        <Link href={`/dosen/khs/${angkatan}`}>
                        <p className="text-lg mb-1 font-sans font-semibold text-left">
                            Angkatan {angkatan}
                        </p>
                        <p className="text-sm font-sans font-extralight">
                            Jumlah Mahasiswa Anda :{" "}
                            {groupAngkatan[angkatanNumber].length}
                        </p>
                        </Link>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    </div>
    );
}
