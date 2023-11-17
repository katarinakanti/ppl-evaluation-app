import { fetchAllMahasiswa } from "@/data/departemen";
import { groupMhsByAngkatan } from "@/utils/functions";
import Link from "next/link";

export default async function Page() {
const MhsData = await fetchAllMahasiswa();
const groupAngkatan = groupMhsByAngkatan(MhsData);
return (
<div>
    <br />
    <br />
    <h1 className="text-center text-4xl font-bold font-arial">
    Progress Studi Mahasiswa
    </h1>
    <br />
    <br />
    <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">Pilih Angkatan</p>
    </div>

    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex items-center justify-center pt-10">
        <div className="flex-col flex w-11/12">
        {groupAngkatan.map((data) => {
            return (
            <div className="flex w-full mb-8" key={data.angkatan}>
                <div className="text-2xl font-semibold flex items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                <div>
                    <Link href={`/departemen/progress/${data.angkatan}`}>
                    <p className="text-lg mb-1 font-sans font-semibold text-left">
                        Angkatan {data.angkatan}
                    </p>
                    <p className="text-sm font-sans font-extralight">
                        Jumlah Total Mahasiswa : {data.count}
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
