import { fetchIrsByNimBySem } from "@/data/irs";
import Link from "next/link";
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
      <UpdateIrs data={irsSemester} params={params} />
    </>
  );
}
