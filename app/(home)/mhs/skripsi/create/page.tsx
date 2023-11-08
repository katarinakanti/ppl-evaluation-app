import Link from "next/link";
import CreateSkripsi from "./form";
import { fetchAllDosen } from "@/data/dosen";

export default async function Page() {
    const dosen = await fetchAllDosen();
    return (
        <>
        <CreateSkripsi dosen={dosen} />
        </>
    );
}
