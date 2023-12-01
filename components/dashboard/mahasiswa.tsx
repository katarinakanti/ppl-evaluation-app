import { fetchMahasiswaByNim } from "@/data/mahasiswa";
import { progressMahasiswa } from "@/data/progress";
import { mapProgressMhs } from "@/utils/helper";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import ProgressSemesters from "../Progress";

export default async function MahasiswaDashboard({
  session,
}: {
  session: Session;
}) {
  const SEMESTER_TOTAL = 14;
  const data = await progressMahasiswa(session.user.user_metadata.no_induk);
  const mhsData = await fetchMahasiswaByNim(
    session.user.user_metadata.no_induk
  );
  const mappedData = mapProgressMhs(data);

  return (
    <>
      <div className="text-center mt-10 text-3xl font-bold">
        <h2>
          Progress Perkembangan Studi Mahasiswa Informatika Fakultas Sains dan
          Matematika UNDIP Semarang
        </h2>
      </div>

      <div className="flex mb-8 mt-10 mx-auto bg-gray-100 w-11/12 h-48">
        <div className="flex items-center justify-end ml-10">
          <img
            className="h-150 w-150 rounded-full"
            src="/img/slide1.jpg"
            alt="Foto_Mahasiswa"
            height={150}
            width={150}
          />
        </div>

        <div className="flex items-center justify-center ml-10">
          <div className="flex-col ml-20 w-full text-xl font-medium">
            <p>Nama: {mhsData.nama}</p>
            <p>NIM: {mhsData.nim}</p>
            <p>Angkatan: {mhsData.angkatan}</p>
            <p>Dosen Wali: {mhsData.dosen.nama}</p>
          </div>
        </div>
      </div>
      <p className="text-center text-3xl">Semester</p>
      <div className="grid grid-cols-5">
        <ProgressSemesters
          semestersData={mappedData}
          SEMESTER_TOTAL={SEMESTER_TOTAL}
        />
      </div>
      <div className="flex mt-10 ml-32">
        <h1 className="text-xl font-semibold">Keterangan</h1>
      </div>
      <div className="flex">
        <div className="flex mt-5 ml-32 w-5 h-5 border border-red-600 bg-red-600"></div>
        <p className="flex mt-5 ml-5">
          Belum diisikan (IRS dan KHS) atau tidak digunakan
        </p>
      </div>
      <div className="flex">
        <div className="flex mt-5 ml-32 w-5 h-5 border border-blue-300 bg-blue-300"></div>
        <p className="flex mt-5 ml-5">Sudah diisikan (IRS saja)</p>
      </div>
      <div className="flex">
        <div className="flex mt-5 ml-32 w-5 h-5 border border-blue-600 bg-blue-600"></div>
        <p className="flex mt-5 ml-5">Sudah diisikan (IRS dan KHS)</p>
      </div>
      <div className="flex">
        <div className="flex mt-5 ml-32 w-5 h-5 border border-yellow-600 bg-yellow-600"></div>
        <p className="flex mt-5 ml-5">Sudah Lulus PKL (IRS, KHS, dan PKL)</p>
      </div>
      <div className="flex">
        <div className="flex mt-5 ml-32 w-5 h-5 border border-green-600 bg-green-600"></div>
        <p className="flex mt-5 ml-5">Sudah Lulus skripsi </p>
      </div>
    </>
  );
}
