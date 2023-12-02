import { fetchAllMahasiswa } from "@/data/mahasiswa";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const data = await fetchAllMahasiswa();
  return (
    <>
      <div className="m-6 mx-32">
        <p className="text-center text-xl mb-5">Data Mahasiswa</p>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
