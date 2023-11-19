import Link from "next/link";
import { fetchAllMahasiswaPKL } from "@/data/departemen";
import { fetchAllMahasiswa } from "@/data/departemen";
import { groupMhsByAngkatanPKL } from "@/utils/functions";
import { PrintButton } from "@/components/Button";

export default async function Page() {
const MhsData = await fetchAllMahasiswa();
const MhsDataPKL = await fetchAllMahasiswaPKL();
const groupAngkatan = groupMhsByAngkatanPKL(MhsData,MhsDataPKL);
return (
<>
    <br />
    <br />
    <h1 className="text-center text-2xl font-bold font-arial">
    Rekap Progress PKL Mahasiswa Informatika 
    Fakultas Sains dan Matematika UNDIP Semarang
    </h1>
    <br />
    <br />
    <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center text-xl font-semibold">Angkatan</p>
    </div>
    <table className="mx-auto bg-gray-100 w-10/12"> 
    {groupAngkatan.map((data) => {
        return ( 
            <td>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                {data.angkatan}      
                </th>
                <tr>
                <td className=" py-2 px-4 border border-stone-800 text-center font-semibold">Sudah</td>
                <td className=" py-2 px-4 border border-stone-800 text-center font-semibold">Belum</td>   
                </tr> 
                <td className=" py-2 px-4 border border-stone-800 text-center font-semibold text-2xl">{data.sudah}</td>
                <td className=" py-2 px-4 border border-stone-800 text-center font-semibold text-2xl">{data.belum}</td>  
            </td>
        );
    })}
    </table>
    <div className="flex justify-center mt-10">
        {/* Pagination or 'Print' button would go here */}
        {/* print button */}
        <PrintButton />
    </div>
</>
);
}
