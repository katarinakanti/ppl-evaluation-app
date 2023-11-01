import Link from "next/link";
import GenerateMhs from "@/components/GenerateMhs";
import { fetchAllDosen } from "@/data/dosen";

export default async function Operator() {
  const dosen = await fetchAllDosen();

  return (
    <div>
      <GenerateMhs dosen={dosen} />
    </div>
  );
}
