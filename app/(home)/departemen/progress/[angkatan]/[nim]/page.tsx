import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchMhsByNip } from "@/data/dosen";
import { groupMahasiswaByAngkatan } from "@/utils/functions";
import { fetchMahasiswaByNim } from "@/data/mahasiswa";
import Link from "next/link";
import Search from "@/components/Search";

export default async function Page(
) {
// const supabase = createServerComponentClient<Database>({ cookies });
// const {
// data: { session },
// } = await supabase.auth.getSession();

// const MhsPerAngkatan = await fetchMhsByNipByAngkt(
// session!.user.user_metadata.no_induk,
// Number(params.angkatan),
// searchParams.query
// );

// console.log(searchParams);
// const MhsData = await fetchMhsByNip(session!.user.user_metadata.no_induk);

// const MhsDataNumber = MhsData.map((mahasiswa) => ({
//   angkatan: Number(mahasiswa.angkatan),
// }));
// const groupAngkatan = groupMahasiswaByAngkatan(MhsDataNumber);

// const supabase = createServerComponentClient<Database>({ cookies });
// const {
// data: { session },
// } = await supabase.auth.getSession();

// const mahasiswaData = await fetchMahasiswaByNim(
// session!.user.user_metadata.no_induk
// );

return (
<>
    <div className="text-center mt-10 text-3xl font-bold">
    <h2>Progress Perkembangan Studi Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP Semarang</h2>
    </div>


<div className="flex mb-8 mt-10 mx-auto bg-gray-100 w-11/12 h-48">
    <div className="flex items-center justify-end ml-10">
        <img
        className="h-150 w-150 rounded-full"
        src="/img/slide1.jpg"
        alt="Foto_Mahasiswa"
        height={150}
        width={150}
        />
    </div>

    <div className="flex items-center justify-center ml-10">
        <div className="flex-col ml-20 w-full text-xl font-medium">
            <p>Nama:</p>
            <p>NIM:</p>
            <p>Angkatan:</p>
            <p>Dosen Wali:</p>
        </div>
    </div>
</div>
<p className="text-center text-3xl">Semester</p>
<div className="flex">
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">1</h1>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">2</h1>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">3</h1>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">4</h1>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">5</h1>
    </div>
</div>
<div className="flex">
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">6</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">7</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">8</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">9</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">10</h1>
    </div>
</div>
<div className="flex">
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">11</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">12</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">13</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">14</h1>
    </div>
    <div className="mt-5 flex items-center justify-center mx-auto bg-gray-100 w-40 h-20">
        <h1 className="text-4xl">+</h1>
    </div>
</div>
<div className="flex mt-10 ml-32">
    <h1 className="text-xl font-semibold">Keterangan</h1>
</div>
<div className="flex">
    <div className="flex mt-5 ml-32 w-5 h-5 border border-red-600 bg-red-600"></div>
    <p className="flex mt-5 ml-5">Belum diisikan (IRS dan KHS) atau tidak digunakan</p>
</div>
<div className="flex">
    <div className="flex mt-5 ml-32 w-5 h-5 border border-blue-600 bg-blue-600"></div>
    <p className="flex mt-5 ml-5">Sudah diisikan (IRS dan KHS)</p>
</div>
<div className="flex">
    <div className="flex mt-5 ml-32 w-5 h-5 border border-yellow-600 bg-yellow-600"></div>
    <p className="flex mt-5 ml-5">Sudah Lulus PKL (IRS, KHS, dan PKL)</p>
</div>
<div className="flex">
    <div className="flex mt-5 ml-32 w-5 h-5 border border-green-600 bg-green-600"></div>
    <p className="flex mt-5 ml-5">Sudah Lulus skripsi </p>
</div>
</>
);
}
