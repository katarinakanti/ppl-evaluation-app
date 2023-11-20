import { PrintButton } from "@/components/Button";
import { fetchMahasiswaByAngkatan } from "@/data/mahasiswa";

export default async function Page({
params,
}: {
params: { angkatan: string; search: string;};
}) {
const data = await fetchMahasiswaByAngkatan(
Number(params.angkatan),
params.search
);


return (
<div className="container mx-auto mt-5">
    <h2 className="mt-10 text-2xl font-bold text-center mb-4">
    Daftar Sudah/Belum Lulus PKL Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP Semarang
    </h2>
    <div className="flex justify-end mb-2">
    {/* Sort and Filter buttons would go here */}
    </div>
    <div className="mt-10 overflow-x-auto">
    <table className="min-w-full bg-white">
        <thead>
        <tr>
            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            No
            </th>
            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            NIM
            </th>
            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            Nama 
            </th>
            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            Angkatan
            </th>
            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            Nilai
            </th>
        </tr>
        </thead>
        <tbody>
        {data.map((student, index) => (
            <tr key={student.nim} className="hover:bg-grey-lighter">
            <td className="text-center py-2 px-4 border-b border-grey-light">
                {index + 1}
            </td>
            <td className="text-center py-2 px-4 border-b border-grey-light">
                {student.nim}
            </td>
            {/* <td className="text-center py-2 px-4 border-b border-grey-light">
                {student.nama}
            </td> */}
            <td className="text-center py-2 px-4 border-b border-grey-light">
                {student.angkatan}
            </td>
            {/* <td className="text-center py-2 px-4 border-b border-grey-light">
                {student.nilai_pkl}
            </td> */}
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    <div className="flex justify-center mt-4">
    {/* Pagination or 'Print' button would go here */}
    {/* print button */}
    <PrintButton />
    </div>
</div>
);
}
