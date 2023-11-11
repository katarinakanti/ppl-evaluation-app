import { fetchKhsByNimBySem } from "@/data/khs";
import Link from "next/link";
import UpdateKhs from "./form";

export default async function Page({
    params,
    }: {
    params: { angkatan: string; nim: string; semester: string };
    }) {
    const khsSemester = await fetchKhsByNimBySem(
        params.nim,
        Number(params.semester)
    );

    return (
        <>
        <UpdateKhs data={khsSemester} params={params} />
        </>
    );
}
