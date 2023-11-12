import { PrintButton } from "@/components/Button";
import { fetchIrsByAngkatanBySmt } from "@/data/irs";

export default async function Page({
  params,
}: {
  params: { angkatan: string; semester: string };
}) {
  const data = await fetchIrsByAngkatanBySmt(
    Number(params.angkatan),
    Number(params.semester)
  );

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center mb-4">
        Data IRS Mahasiswa Semester {params.semester} Angkatan {params.angkatan}
      </h2>
      <div className="flex justify-end mb-2">
        {/* Sort and Filter buttons would go here */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                No
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                NIM
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Nama Mahasiswa
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Status
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Angkatan
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Jumlah SKS
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Status IRS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={student.nim} className="hover:bg-grey-lighter">
                <td className="py-2 px-4 border-b border-grey-light">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.nim}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.nama}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.status_mhs}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.angkatan}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.sks_diambil}
                </td>
                <td className="py-2 px-4 border-b border-grey-light">
                  {student.status_verifikasi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination or 'Print' button would go here */}
        {/* print button */}
        <PrintButton />
      </div>
    </div>
  );
}
