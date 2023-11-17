import Link from "next/link";
import { PrintButton } from "@/components/Button";

export default function Page() {
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

            <tr>
            <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2016      
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark ">
                2017
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2018
                </th>
                <th className="border  border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2019
                </th>
                <th className="border  border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2020
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2021
                </th>
                <th className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                2022
                </th>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Aktif</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Cuti</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Mangkir</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Drop Out</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Undur Diri</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Lulus</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
            </tr>
            <tr>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">Meninggal Dunia</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">150</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">120</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">210</td>
                <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-normal uppercase text-xl text-grey-dark">250</td>
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
