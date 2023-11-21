import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchMhsByNip } from "@/data/dosen";
import { groupMahasiswaByAngkatan } from "@/utils/functions";
import { fetchMahasiswaByAngkatan } from "@/data/mahasiswa";
import Link from "next/link";
import Search from "@/components/Search";

export default async function Page({
  params,
  searchParams,
}: {
  params: { angkatan: number };
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const MhsPerAngkatan = await fetchMahasiswaByAngkatan(
    Number(params.angkatan),
    searchParams.query
  );

  // console.log(searchParams);
  // const MhsData = await fetchMhsByNip(session!.user.user_metadata.no_induk);

  // const MhsDataNumber = MhsData.map((mahasiswa) => ({
  //   angkatan: Number(mahasiswa.angkatan),
  // }));
  // const groupAngkatan = groupMahasiswaByAngkatan(MhsDataNumber);

  return (
    <>
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Progress Mahasiswa - Angkatan {params.angkatan}</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">IRS</p>
      </div>
      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col items-center">
          <div className="flex-col ml-8 mb-10">
            <div className="flex w-full">
              <div className="mt-10">
                <p className="text-xl flex items-center font-semibold">
                  Angkatan {params.angkatan}
                </p>
                <div className="flex">
                  <p className="text-sm flex items-center mt-5">
                    Jumlah Mahasiswa: {MhsPerAngkatan.length}
                  </p>
                  {/* <p className="ml-12 text-sm flex items-center mt-5">Sudah PKL : 2</p> */}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10 mb-10 mr-12">
              {/* <input
            className="p-2 border border-gray-300 bg-white"
            type="search"
            name="search"
            id="search"
            placeholder="Cari Nama/Nim"
            /> */}
              <Search placeholder={"Cari Nama/NIM"} />
            </div>
            {MhsPerAngkatan.map((data) => (
              <div key={data.nim} className="flex w-full pb-10">
                <div className="items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                <div className="flex items-center bg-gray-200 w-11/12 h-20 p-4">
                  <Link
                    href={`/departemen/progress/${params.angkatan}/${data.nim}`}
                  >
                    <p className="text-lg mb-1 font-sans font-semibold text-left">
                      {data.nama}
                    </p>
                    <p className="text-sm font-sans font-extralight">
                      NIM : {data.nim}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
