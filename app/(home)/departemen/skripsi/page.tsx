import Link from "next/link";
import { fetchAllMahasiswaSkripsi } from "@/data/departemen";
import { fetchAllMahasiswa } from "@/data/departemen";
import { groupMhsByAngkatanSkripsi } from "@/utils/functions";
import { PrintButton } from "@/components/Button";

export default async function Page() {
  const MhsData = await fetchAllMahasiswa();
  const MhsDataSkripsi = await fetchAllMahasiswaSkripsi();
  const groupAngkatan = groupMhsByAngkatanSkripsi(MhsData, MhsDataSkripsi);
  return (
    <>
      <br />
      <br />
      <h1 className="text-center text-2xl font-bold font-arial">
        Rekap Progress Skripsi Mahasiswa Informatika Fakultas Sains dan
        Matematika UNDIP Semarang
      </h1>
      <br />
      <br />
      <table className="mx-auto bg-gray-100 w-10/12">
        <thead>
          <tr></tr>
          <tr>
            <th
              className="border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark"
              colSpan={7}
            >
              Angkatan
            </th>
          </tr>
          <tr>
            {groupAngkatan.map((data) => (
              <th key={data.angkatan}>
                <td
                  className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark"
                  colSpan={2}
                >
                  {data.angkatan}
                </td>
                <tr>
                  <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                    Sudah
                  </td>
                  <td className="text-center border border-stone-800 py-2 px-4 bg-grey-lightest font-semibold uppercase text-2xl text-grey-dark">
                    Belum
                  </td>
                </tr>
                <td className=" py-2 px-4 border border-stone-800 text-center font-semibold text-2xl">
                  <Link href={`/departemen/skripsi/${data.angkatan}?status=1`}>
                    <p>{data.sudah}</p>
                  </Link>
                </td>
                <td className="py-2 px-4 border border-stone-800 text-center font-semibold text-2xl">
                  <Link href={`/departemen/skripsi/${data.angkatan}`}>
                    <p>{data.belum}</p>
                  </Link>
                </td>
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="flex justify-center mt-10">
        {/* Pagination or 'Print' button would go here */}
        {/* print button */}
        <PrintButton />
      </div>
    </>
  );
}
