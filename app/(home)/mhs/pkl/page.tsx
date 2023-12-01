// import CreatePkl from "./create/form";
import { fetchPklByNim } from "@/data/pkl";
import { getFileUrl } from "@/utils/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({ params }: { params: { nim: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const nim = session?.user.user_metadata.no_induk;

  const pkl = await fetchPklByNim(nim);

  return (
    <>
      {/* <CreatePkl /> */}
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Praktek Kerja Lapangan (PKL)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">PKL</p>
      </div>

      <div className="flex items-center  mx-auto bg-gray-100 w-10/12 h-fit">
        {pkl ? (
          <div className="flex-col ml-8">
            {/* <div className="flex w-full mt-5">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Dosen Pembimbing
                </p>
              </div>
              <div className="flex items-center ml-32">
                {" "}
                :<p className="ml-10">{pkl.dosen.nama}</p>
              </div>
            </div> */}

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Waktu PKL
              </p>
              <div className="flex items-center ml-32">
                :<p className="ml-10">{pkl.waktu_pkl.toString()}</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
              <div className="flex items-center ml-32">
                :<p className="ml-10">{pkl.nilai_pkl}</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <div>
                <p className="flex items-center w-52 p-10 font-semibold">
                  Status Verifikasi
                </p>
              </div>
              <div className="flex items-center ml-40">
                :
                <p className="ml-10">
                  {pkl.status_verifikasi_id === 1
                    ? "Diproses"
                    : "Sudah diverifikasi"}
                </p>
              </div>
            </div>

            <div className="flex w-full mt-5 mb-10 ml-10">
              <button className="bg-white hover:bg-blue-100 text-green-400 border border-green-400 px-5 py-1 font-semibold rounded mb-5">
                <Link href="/mhs/pkl/edit">Ubah</Link>
              </button>
              <button className="ml-5 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-5 py-1 font-semibold rounded mb-5">
                <a target="_blank" href={getFileUrl(pkl.scan_pkl)}>
                  Scan PKL
                </a>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full mt-5 mb-10 ml-10">
            <button className="bg-white hover:bg-blue-100 text-green-400 border border-green-400 px-5 py-1 font-semibold rounded mb-5">
              <Link href="/mhs/pkl/create">Tambah PKL</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
