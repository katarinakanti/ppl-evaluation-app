"use client";

import { Khs } from "@/data/khs";
import { getFileUrl } from "@/utils/functions";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifikasiKHSComponentProps {
khs: Khs;
angkatan: string;
}

export default function VerifikasiKhs({
khs,
angkatan,
}: VerifikasiKHSComponentProps) {
const router = useRouter();
const supabase = createClientComponentClient();
const [status, setStatus] = useState<"Approve" | "Disapprove" | "Loading">(
"Loading"
);
const handleClick = async () => {
setStatus("Loading");
const { data, error } = await supabase
    .from("khs")
    .update({ status_verifikasi_id: khs.status_verifikasi_id === 1 ? 2 : 1 })
    .eq("nim", khs.nim)
    .eq("semester", khs.semester);
if (error) {
    console.log(error);
} else {
    setStatus(status === "Approve" ? "Disapprove" : "Approve");
    router.refresh();
}
};

useEffect(() => {
switch (khs.status_verifikasi_id) {
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
}, [khs]);

return (
    <>
    {/* <link rel="stylesheet" href="view.css" /> */}
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Kartu Hasil Studi (KHS)</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">KHS</p>
    </div>
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex items-center">
        <div className="flex-col ml-8">
        <div className="flex w-full mt-5">
            <div>
            <p className="flex items-center w-60 p-10 font-semibold">
                Semester
            </p>
            </div>
            <div className="flex items-center ml-40">
            {" "}
            :<p className="ml-10">{khs.semester}</p>
            </div>
        </div>

        <div className="flex w-full -mt-10">
            <div>
            <p className="flex items-center w-60 p-10 font-semibold">
                IP Semester
            </p>
            </div>
            <div className="flex items-center ml-40">
            :<p className="ml-10">{khs.ip_semester}</p>
            </div>
        </div>

        <div className="flex w-full -mt-10">
            <div>
            <p className="flex items-center w-60 p-10 font-semibold">
                SKS Semester
            </p>
            </div>
            <div className="flex items-center ml-40">
            :<p className="ml-10">{khs.sks_semester}</p>
            </div>
        </div>

        <div className="flex w-full -mt-10">
            <div>
            <p className="flex items-center w-60 p-10 font-semibold">
                IP Kumulatif
            </p>
            </div>
            <div className="flex items-center ml-40">
            :<p className="ml-10">{khs.ip_kumulatif}</p>
            </div>
        </div>

        <div className="flex w-full -mt-10">
            <div>
            <p className="flex items-center w-60 p-10 font-semibold">
                SKS Kumulatif
            </p>
            </div>
            <div className="flex items-center ml-40">
            :<p className="ml-10">{khs.sks_kumulatif}</p>
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

        <div className="flex w-full mt-7">
            <a target="_blank" href={getFileUrl(khs.scan_khs)}>
            <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">
                Scan KHS
            </button>
            </a>
                {" "}
        </div>
        <div className="flex w-full mt-7">
            <Link
            href={`/dosen/khs/${angkatan}/${khs.nim}/${khs.semester}/edit`}
            >
            <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-orange-400 border border-orange-400 font-semibold rounded">
                Ubah
            </button>
            </Link>
                {" "}
        </div>
        <div className="flex w-full mt-5 mb-10">
            <button
            onClick={handleClick}
            className=" w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 font-semibold rounded
            disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
            {status}
            </button>
                {" "}
        </div>
        </div>
    </div>
    </div>
</>
);
}
