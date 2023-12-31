export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchAllProvinsi } from "@/data/provinsi";
import UserForm from "./form";
import { fetchDepartemenByNip } from "@/data/departemen";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await fetchDepartemenByNip(session!.user.user_metadata.no_induk);
  const provData = await fetchAllProvinsi();

  return (
    <>
      <div className="flex mb-8 mt-10 mx-auto bg-gray-100 w-10/12 h-48">
        <div className="flex items-center justify-center ml-10">
          <img
            className="h-150 w-150 rounded-full"
            src="/img/slide1.jpg"
            alt="Foto_Mahasiswa"
            height={150}
            width={150}
          />
        </div>

        <div className="flex items-center justify-center ml-10">
          <div className="flex-col w-full">
            <p className="text-4xl mb-5 font-arial font-semibold text-left">
              {session!.user.user_metadata.nama}
            </p>

            <div className="flex">
              <p className="text-lg font-arial font-extralight">
                NIM : {session!.user.user_metadata.no_induk}
              </p>
              <p className="ml-32 text-lg font-arial font-extralight">
                Informatika
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mx-auto bg-gray-300 w-10/12 h-10">
        <p className="flex items-center ml-5 font-arial">Profil</p>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex mx-auto pt-14">
          <div className="flex ml-24">
            <div className="flex-col ml-5">
              <img
                src="/img/slide1.jpg"
                alt="Foto_Mahasiswa"
                height={150}
                width={150}
              />
              <p className="mt-3 text-center text-xl font-arial font-medium">
                2023/2024
              </p>
              <p className="mt-3 bg-lime-500 text-white mx-auto w-2/3 rounded py-1 text-center text-medium font-medium">
                Aktif
              </p>
            </div>

            <div className="flex flex-col items-center ml-36">
              <div className="text-left font-arial font-medium">
                <UserForm session={session!} data={data} provData={provData} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex mt-10 justify-end mr-28">
          <button className="bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-7 py-1 font-semibold rounded mb-5">
            Simpan
          </button>
        </div> */}
      </div>
    </>
  );
}
