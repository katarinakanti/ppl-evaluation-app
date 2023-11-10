"use client";

import { Irs } from "@/data/irs";
import { getFileUrl } from "@/utils/functions";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifikasiIRSComponentProps {
  irs: Irs;
}

export default function VerifikasiIrs({ irs }: VerifikasiIRSComponentProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState<"Approve" | "Disapprove" | "Loading">(
    "Loading"
  );
  const handleClick = async () => {
    setStatus("Loading");
    const { data, error } = await supabase
      .from("irs")
      .update({ status_verifikasi_id: irs.status_verifikasi_id === 1 ? 2 : 1 })
      .eq("nim", irs.nim)
      .eq("semester", irs.semester);
    if (error) {
      console.log(error);
    } else {
      setStatus(status === "Approve" ? "Disapprove" : "Approve");
      router.refresh();
    }
    // revalidatePath(`/dosen/irs/${angkatan}/${irs.nim}/${irs.semester}`);
    // redirect(`/dosen/irs/${angkatan}/${irs.nim}/${irs.semester}`);
  };

  useEffect(() => {
    switch (irs.status_verifikasi_id) {
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
  }, [irs]);

  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Isian Rencana Semester (IRS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">IRS</p>
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
                :<p className="ml-10">{irs.semester}</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Jumlah SKS Semester
                </p>
              </div>
              <div className="flex items-center ml-40">
                :<p className="ml-10">{irs.sks_diambil}</p>
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
              <a target="_blank" href={getFileUrl(irs.scan_irs)}>
                <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">
                  Scan IRS
                </button>
              </a>
                  {" "}
            </div>
            <div className="flex w-full mt-7">
              <a target="_blank" href={`/dosen/irs/${irs.nim}/${irs.semester}/edit`}>
                <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-orange-400 border border-orange-400 font-semibold rounded">
                  Ubah
                </button>
              </a>
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
