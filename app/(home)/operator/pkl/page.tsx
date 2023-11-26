import { groupMahasiswaByAngkatan } from "@/utils/functions";
import Link from "next/link";
import { fetchAllMahasiswa } from "@/data/mahasiswa";

export default async function Page() {
  const MhsData = await fetchAllMahasiswa();

  const MhsDataNumber = MhsData.map((mahasiswa) => ({
    angkatan: Number(mahasiswa.angkatan),
  }));

  const groupAngkatan = groupMahasiswaByAngkatan(MhsDataNumber);

  return (
    <div>
      <br />
      <br />
      <h1 className="text-center text-4xl font-bold font-arial">
        Praktek Kerja Lapangan (PKL)
      </h1>
      <br />
      <br />
      <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">PKL</p>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center justify-center pt-10">
          <div className="flex-col flex w-11/12">
            {Object.keys(groupAngkatan).map((angkatan) => {
              const angkatanNumber = parseInt(angkatan, 10); // Mengonversi string ke number
              return (
                <div className="flex w-full mb-8" key={angkatanNumber}>
                  <div className="text-2xl font-semibold flex items-center justify-center bg-gray-300 w-14 h-20 p-4"></div>
                  <div className="flex items-center bg-gray-200 w-full h-20 p-4">
                    <div>
                      <Link href={`/operator/pkl/${angkatan}`}>
                        <p className="text-lg mb-1 font-sans font-semibold text-left">
                          Angkatan {angkatan}
                        </p>
                        <p className="text-sm font-sans font-extralight">
                          Jumlah Mahasiswa :{" "}
                          {groupAngkatan[angkatanNumber].length}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
