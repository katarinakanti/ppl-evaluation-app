import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchMhsByNip } from "@/data/dosen";
import Link from "next/link";
import Search from "@/components/Search";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
};
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const MhsData = await fetchMhsByNip(
    session!.user.user_metadata.no_induk,
    searchParams.query
  );

  return (
    <div>
      <br />
      <br />
      <h1 className="text-center text-4xl font-bold font-arial">
        Search Progress Studi
      </h1>
      <br />
      <br />
      <div className="flex items-center mx-auto bg-gray-100 w-10/12 h-16">
        <div className="pt-5 pl-12 w-7/12">
          <Search placeholder={"Cari Nama/NIM"}/>
        </div>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
          <div className="flex-col flex w-11/12">
            {MhsData.map((data) => (
                <div className="flex w-full mb-8">
                  <div className="text-2xl font-semibold flex items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                  <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                    <div className="w-7/12">
                      
                      <div>
                          <p className="text-lg mb-1 font-sans font-semibold text-left">
                            {data.nama}
                          </p>
                          <p className="text-sm font-sans font-extralight">
                            Angkatan : {data.angkatan}
                          </p>
                      </div>
                    </div>

                      <div className="ml-10 w-3/12">
                        <div className="flex items-center w-full h-10">
                          <Link className="flex items-center bg-red-500 hover:bg-red-400 text-white h-full px-7" href={`/dosen/khs/${data.nim}`}>IRS</Link>
                          <Link className="ml-3 flex items-center border bg-orange-500 hover:bg-orange-400 text-white h-full px-7" href={`/dosen/khs/${data.nim}`}>KHS</Link>
                          <Link className="ml-3 flex items-center border bg-green-500 hover:bg-green-400 text-white h-full px-7" href={`/dosen/khs/${data.nim}`}>PKL</Link>
                          <Link className="ml-3 flex items-center border bg-blue-500 hover:bg-blue-400 text-white h-full px-7" href={`/dosen/khs/${data.nim}`}>Skripsi</Link>
                        </div>
                      </div>

                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
