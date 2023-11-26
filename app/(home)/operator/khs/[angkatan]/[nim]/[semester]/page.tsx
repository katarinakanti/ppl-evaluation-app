import { fetchKhsByNimBySem } from "@/data/khs";
import Link from "next/link";
import VerifikasiKhs from "./verifkasi-khs";

export default async function Page({
  params,
}: {
  params: { angkatan: string; nim: string; semester: string };
}) {
  const data = await fetchKhsByNimBySem(params.nim, Number(params.semester));

  return (
    <>
      <Link href={`/operator/khs/${params.angkatan}/${params.nim}`}></Link>
      <VerifikasiKhs khs={data} angkatan={params.angkatan} />
    </>
  );
}
