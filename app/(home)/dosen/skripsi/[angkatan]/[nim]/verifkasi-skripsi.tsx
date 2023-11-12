"use client";

import { Skripsi, SkripsiWithRelations, SkripsiState } from "@/data/skripsi";
import { getFileUrl, formatDateToIndonesian } from "@/utils/functions";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifikasiSkripsiComponentProps {
skripsi: SkripsiWithRelations;
angkatan: string;
}

export default function VerifikasiSkripsi({
skripsi,
angkatan,
}: VerifikasiSkripsiComponentProps) {
const router = useRouter();
const supabase = createClientComponentClient();
const [status, setStatus] = useState<"Approve" | "Disapprove" | "Loading">(
"Loading"
);
const handleClick = async () => {
if (skripsi) {
    setStatus("Loading");
    const { data, error } = await supabase
    .from("skripsi")
    .update({ status_verifikasi_id: status === "Approve" ? 2 : 1 })
    .eq("nim", skripsi.nim);
    if (error) {
    console.log(error);
    } else {
    setStatus(status === "Approve" ? "Disapprove" : "Approve");
    router.refresh();
    }
}
};

useEffect(() => {
if (skripsi) {
    switch (skripsi.status_verifikasi_id) {
    case 1:
        setStatus("Approve");
        break;
    case 2:
        setStatus("Disapprove");
        break;
    default:
        setStatus("Loading");
        break;
    }
}
}, [skripsi]);

// const formattedDate = new Date(pkl.waktu_pkl).toLocaleString();

return (
<>
    {/* <link rel="stylesheet" href="view.css" /> */}
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Skripsi</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">Skripsi</p>
    </div>
    {skripsi && (
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <br />
        <div className="flex w-full">
        <div className="flex-col ml-8">
            <div className="flex w-full mt-5">
            <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                Dosen Pembimbing
                </p>
            </div>
            <div className="flex items-center ml-40">
                {" "}
                :<p className="ml-10">{skripsi.dosen.nama}</p>
            </div>
            </div>

            <div className="flex w-full -mt-10">
            <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                Lama Studi
                </p>
            </div>
            <div className="flex items-center ml-40">
                :
                <p className="ml-10">
                {skripsi.semester}
                </p>
            </div>
            </div>

            <div className="flex w-full -mt-10">
            <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                Tanggal Sidang
                </p>
            </div>
            <div className="flex items-center ml-40">
                :
                <p className="ml-10">
                {formatDateToIndonesian(skripsi.tgl_sidang)}
                </p>
            </div>
            </div>

            <div className="flex w-full -mt-10">
            <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                Nilai Skripsi
                </p>
            </div>
            <div className="flex items-center ml-40">
                :<p className="ml-10">{skripsi.nilai_skripsi}</p>
            </div>
            </div>
            <div className="flex w-full -mt-10">
            <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                Status Verifikasi
                </p>
            </div>
            <div className="flex items-center ml-40">
                :
                <p className="ml-10">
                {status === "Approve" ? "Diproses" : "Disetujui"}
                </p>
            </div>
            </div>
        </div>
        </div>

        <div className="flex justify-end w-full items-end">
            <div className="flex col mb-10 mr-10 ">
                <div className="flex w-full">
                <a target="_blank" href={getFileUrl(skripsi.scan_skripsi)}>
                    <button className="w-32 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                    Lihat IRS
                    </button>
                        {" "}
                </a>
                </div>
                <div className="flex w-full ml-3">
                <Link
                    href={`/dosen/skripsi/${angkatan}/${skripsi.nim}/${skripsi.semester}/edit`}
                >
                    <button className="bg-white h-10 hover:bg-blue-200 text-blue-400 border border-blue-400 px-10 font-semibold rounded">
                    Ubah
                    </button>
                        {" "}
                </Link>
                </div>
                <div className="flex w-full">
                <button
                    onClick={handleClick}
                    className="bg-green-500 h-10 hover:bg-green-600 text-white font-semibold px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                    {status}
                </button>
                    {" "}
                </div>
            </div>
            </div>
        </div>
    )}
</>
);
}
