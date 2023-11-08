import { fetchKhsByNimBySem } from "@/data/khs";
import { getFileUrl } from "@/utils/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { semester: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const no_induk = session!.user.user_metadata.no_induk;

  const khsData = await fetchKhsByNimBySem(
    session!.user.user_metadata.no_induk,
    Number(params.semester)
  );

  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Kartu Hasil Studi (KHS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">Entry Kartu Hasil Studi</p>
              
      </div>
      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <br />
        <p className="text-center text-4xl">Semester {params.semester}</p>{" "}
              
        <div className="flex items-center">
          <div className="flex-col ml-8">
            <div className="flex w-full -mt-3">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  SKS Semester
                </p>
              </div>
              <div className="flex items-center ml-80">
                {" "}
                :<p className="ml-10 w-80 p-2">{khsData.sks_semester}</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                IP Semester
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :<p className="ml-10 w-80 p-2 ">{khsData.ip_semester}</p>
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                SKS Kumulatif
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :<p className="ml-10 w-80 p-2">{khsData.sks_kumulatif}</p>
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                IP Kumulatif
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :<p className="ml-10 w-80 p-2">{khsData.ip_kumulatif}</p>
                          {" "}
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
                  {khsData.status_verifikasi_id === 1
                    ? "Diproses"
                    : "Sudah diverifikasi"}
                </p>
              </div>
            </div>

            <div className="flex w-full mt-7">
              <a target="_blank" href={getFileUrl(khsData.scan_khs)}>
                <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">
                  Scan KHS
                </button>
              </a>
                  {" "}
            </div>
            <div className="flex w-full mt-5 mb-10">
              <Link href={`/mhs/khs/${params.semester}/edit`}>
                <button className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded">
                  Ubah
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
