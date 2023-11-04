import { fetchKhsByNim } from "@/data/khs";
import { mapAngkatanAndSmtToWord } from "@/utils/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const no_induk = session!.user.user_metadata.no_induk;
  const angkatan = "20" + no_induk.substring(6, 8);

  const khsData = await fetchKhsByNim(session!.user.user_metadata.no_induk);
  return (
    <div>
      <br />
      <br />
      <h1 className="text-center text-4xl font-bold font-arial">
        Kartu Hasil Semester (KHS)
      </h1>
      <br />
      <br />
      <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">KHS</p>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
          <div className="flex-col flex w-11/12">
            {khsData.map((data) => (
              <div key={data.semester} className="flex w-full mb-8">
                <div className="flex items-center justify-center bg-gray-300 w-14 h-20 p-4">
                  {data.semester}
                </div>
                <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                  <div>
                    <Link href={`/mhs/khs/${data.semester}`}>
                      <p className="text-lg mb-1 font-sans font-semibold text-left">
                        Semester {data.semester} | Tahun Ajaran{" "}
                        {mapAngkatanAndSmtToWord(
                          Number(angkatan),
                          data.semester
                        )}
                      </p>
                      <p className="text-sm font-sans font-extralight">
                        Jumlah SKS Semester {data.sks_semester} | Jumlah SKS
                        Kumulatif {data.sks_kumulatif} | IP Semester :{" "}
                        {data.ip_semester} | IP Kumulatif : {data.ip_kumulatif}
                      </p>
                      <p className="text-sm font-sans font-extralight">
                        Status verifikasi:{" "}
                        {data.status_verifikasi_id === 1
                          ? "Belum diverifikasi"
                          : "Sudah diverifikasi"}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-5 justify-end mr-14">
          <button className="bg-white hover:bg-blue-100 text-green-400 border border-green-400 px-5 py-1 font-semibold rounded mb-5">
            <Link href="/mhs/khs/create">Add Semester</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
