import Link from "next/link";
import CreatePkl from "./form";
import { fetchAllDosen } from "@/data/dosen";

export default async function Page() {
  const dosen = await fetchAllDosen();
  return (
    <>
      <CreatePkl dosen={dosen} />
    </>
  );
}
