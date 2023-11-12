import { fetchSkripsiByNim } from "@/data/skripsi";
import Link from "next/link";
import VerifikasiSkripsi from "./verifkasi-skripsi";

export default async function Page({
    params,
    }: {
    params: { angkatan: string; nim: string; semester: string };
    }) {
    const data = await fetchSkripsiByNim(params.nim);

    return (
        <>
        <Link href={`/dosen/skripsi/${params.angkatan}/${params.nim}`}></Link>
        <VerifikasiSkripsi skripsi={data} angkatan={params.angkatan} />
        </>
    );
}
