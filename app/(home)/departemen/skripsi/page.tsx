import Link from "next/link";
import { PrintButton } from "@/components/Button";

export default function Page() {
return (
<>
    <br />
    <br />
    <h1 className="text-center text-2xl font-bold font-arial">
    Rekap Progress Skripsi Mahasiswa Informatika 
    Fakultas Sains dan Matematika UNDIP Semarang
    </h1>
    <br />
    <br />
    <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center text-xl font-semibold">Angkatan</p>
    </div>
    <table className="mx-auto bg-gray-100 w-10/12"> 
        <thead>
            <tr>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2016      
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark " colSpan={2}>
                2017
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2018
                </th>
                <th className="border  border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2019
                </th>
                <th className="border  border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2020
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2021
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark" colSpan={2}>
                2022
                </th>
            </tr>
            <tr>
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th>  
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
                <th className="border border-stone-800 text-center font-semibold">Sudah</th>
                <th className="border border-stone-800 text-center font-semibold">Belum</th> 
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
