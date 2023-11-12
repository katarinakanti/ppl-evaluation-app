"use client";

import { Pkl, PklWithRelations, PklState } from "@/data/pkl";
import { getFileUrl, formatDateToIndonesian } from "@/utils/functions";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifikasiPklComponentProps {
  pkl: PklWithRelations;
  angkatan: string;
}

export default function VerifikasiPkl({
  pkl,
  angkatan,
}: VerifikasiPklComponentProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState<"Approve" | "Disapprove" | "Loading">(
    "Loading"
  );
  const handleClick = async () => {
    if (pkl) {
      setStatus("Loading");
      const { data, error } = await supabase
        .from("pkl")
        .update({ status_verifikasi_id: status === "Approve" ? 2 : 1 })
        .eq("nim", pkl.nim);
      if (error) {
        console.log(error);
      } else {
        setStatus(status === "Approve" ? "Disapprove" : "Approve");
        router.refresh();
      }
    }
  };

  useEffect(() => {
    if (pkl) {
      switch (pkl.status_verifikasi_id) {
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
  }, [pkl]);

  // const formattedDate = new Date(pkl.waktu_pkl).toLocaleString();

  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Praktek Kerja Lapangan (PKL)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">PKL</p>
      </div>
      {pkl && (
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
                  :<p className="ml-10">{pkl.dosen.nama}</p>
                </div>
              </div>

              <div className="flex w-full -mt-10">
                <div>
                  <p className="flex items-center w-60 p-10 font-semibold">
                    Waktu PKL
                  </p>
                </div>
                <div className="flex items-center ml-40">
                  :
                  <p className="ml-10">
                    {formatDateToIndonesian(pkl.waktu_pkl)}
                  </p>
                </div>
              </div>
              <div className="flex w-full -mt-10">
                <div>
                  <p className="flex items-center w-60 p-10 font-semibold">
                    Nilai PKL
                  </p>
                </div>
                <div className="flex items-center ml-40">
                  :<p className="ml-10">{pkl.nilai_pkl}</p>
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
                <a target="_blank" href={getFileUrl(pkl.scan_pkl)}>
                  <button className="w-32 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                    Lihat IRS
                  </button>
                      {" "}
                </a>
              </div>
              <div className="flex w-full ml-3">
                <Link
                  href={`/dosen/pkl/${angkatan}/${pkl.nim}/${pkl.semester}/edit`}
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
