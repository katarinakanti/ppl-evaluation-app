import { fetchIrsByNimBySem } from "@/data/irs";
import UpdateIrs from "./form";

export default async function Page({
  params,
}: {
  params: { angkatan: string; nim: string; semester: string };
}) {
  const irsSemester = await fetchIrsByNimBySem(
    params.nim,
    Number(params.semester)
  );

  return (
    <>
      {irsSemester ? (
        <UpdateIrs data={irsSemester} params={params} />
      ) : (
        <p>Tidak ada data.</p>
      )}
    </>
  );
}
