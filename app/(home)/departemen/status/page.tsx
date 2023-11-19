import Link from "next/link";
import { fetchAllMahasiswaSkripsi } from "@/data/departemen";
import { fetchAllMahasiswa } from "@/data/mahasiswa";
import { fetchStatusMahasiswa } from "@/data/status_mhs";
import { groupMhsByStatusByAngkatan } from "@/utils/functions";
import { PrintButton } from "@/components/Button";

export default async function Page() {
const MhsData = await fetchAllMahasiswa();
const StatusMhsData = await fetchStatusMahasiswa();
const groupAngkatanByStatus = groupMhsByStatusByAngkatan(MhsData, StatusMhsData);
return (
<>
    <br />
    <br />
    <h1 className="text-center text-2xl font-bold font-arial">
    Rekap Mahasiswa Berdasarkan Status Informatika 
    Fakultas Sains dan Matematika UNDIP Semarang
    </h1>
    <br />
    <br />
    <table className="mx-auto bg-gray-100 w-10/12"> 
        <thead>
            <tr>
            </tr>
            <tr>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" rowSpan={2}> Status </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={7}>Angkatan</th> 
            </tr>

            {groupAngkatanByStatus.map((data) => ( 
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                {data.angkatan}
                </th> 
            ))}
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Aktif</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.aktif}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Cuti</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.cuti}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Mangkir</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.mangkir}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">DropOut</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.dropOut}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Undur Diri</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.undurdiri}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Lulus</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.lulus}</td> 
            ))}     
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Meninggal Dunia</td>
            {groupAngkatanByStatus.map((data) => (
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">{data.meninggal}</td> 
            ))}     
            </tr>
        </thead>
    </table>
    <div className="flex justify-center mt-10">
        {/* Pagination or 'Print' button would go here */}
        {/* print button */}
        <PrintButton />
    </div>
</>
);
}
