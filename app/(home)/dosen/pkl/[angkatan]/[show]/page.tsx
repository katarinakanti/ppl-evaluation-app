import {fetchPklByNim1} from "@/data/pkl";
import Link from "next/link";
import VerifikasiPkl from "./verifkasi-pkl";

export default async function Page({
    params,
    }: {
    params: { angkatan: string; nim: string; semester: string };
    }) {
    const data = await fetchPklByNim1(params.nim);

    return (
        <>
        <Link href={`/dosen/pkl/${params.angkatan}/${params.nim}`}></Link>
        <VerifikasiPkl pkl={data} angkatan={params.angkatan} />
        </>
    );
}
