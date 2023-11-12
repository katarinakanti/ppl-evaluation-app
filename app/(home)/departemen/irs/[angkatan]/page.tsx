import {  fetchIrsByAngkatan } from "@/data/irs";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { angkatan: string };
}) {
  // const no_induk = params.nim;
  // const angkt = "20" + no_induk.substring(6, 8);
  // const MhsData = await fetchAllMahasiswa();
  const irsData = await fetchIrsByAngkatan(params.angkatan);

  // const irsData = await fetchIrsByNim(params.nim);
  // const groupedData = groupByAngkatanBySemester(MhsData, irsData);

  return (
    <div>
      <br />
      <br />
      <h1 className="text-center text-4xl font-bold font-arial">
        Isian Rencana Semester (IRS) - Angkatan {params.angkatan}
      </h1>
      <br />
      <br />
      <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">IRS</p>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
          <div className="flex-col flex w-11/12">
            {irsData.map((data) => (
              <div className="flex w-full mb-8" key={data.semester}>
                <div className="flex items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                  <div>
                    <Link
                      href={`/departemen/irs/${params.angkatan}/${data.semester}`}
                    >
                      <p className="text-lg mb-1 font-sans font-semibold text-left">
                        Semester {data.semester}
                      </p>
                      <p className="text-sm font-sans font-extralight">
                        Rata-rata Jumlah SKS Semester {data.average_sks}
                      </p>
                    </Link>
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
