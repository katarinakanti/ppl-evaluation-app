import { fetchIrsByNimBySem } from "@/data/irs";
import Link from "next/link";
import VerifikasiIrs from "./verifkasi-irs";

export default async function Page({
  params,
}: {
  params: { angkatan: string; nim: string; semester: string };
}) {
  const data = await fetchIrsByNimBySem(params.nim, Number(params.semester));

  return (
    <>
      <Link href={`/dosen/irs/${params.angkatan}/${params.nim}`}></Link>
      {data ? (
        <VerifikasiIrs irs={data} angkatan={params.angkatan} />
      ) : (
        <p>Tidak ada data.</p>
      )}
    </>
  );
}
