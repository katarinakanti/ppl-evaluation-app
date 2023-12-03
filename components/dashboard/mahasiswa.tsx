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

        <div className="flex items-center justify-center">
          <div className="flex ml-10 w-full text-xl font-medium">
            <div>
              <p className="">Nama</p>
              <p className="">NIM</p>
              <p className="">Angkatan</p>
              <p className="">Dosen Wali</p>
            </div>
            <div>
              <p className="ml-16">:</p>
              <p className="ml-16">:</p>
              <p className="ml-16">:</p>
              <p className="ml-16">:</p>
            </div>
            <div>
              <p className="ml-5">{mhsData.nama}</p>
              <p className="ml-5">{mhsData.nim}</p>
              <p className="ml-5">{mhsData.angkatan}</p>
              <p className="ml-5">{mhsData.dosen.nama}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mx-auto w-11/12">
        <div className="mb-8 mx-auto w-full h-96">
          <div className= "flex-col mt-5 w-full">
          <div className = "bg-gray-200 h-16 flex items-center justify-center">
            <p className="text-2xl font-semibold">Semester</p>
          </div>
            <div className = "flex h-full bg-gray-100">
              <div className="flex w-full">
                <div className="ml-5 pb-10 w-11/12 grid grid-cols-7">
                  <ProgressSemesters
                    semestersData={mappedData}
                    SEMESTER_TOTAL={SEMESTER_TOTAL}
                  />
                </div>
                <div className="flex-col mx-10">
                  <div className="flex mt-4">
                    <h1 className="text-xl font-semibold">Keterangan</h1>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="flex w-6 h-5 border border-red-600 bg-red-600"></div>
                      <p className="flex ml-5">
                        Belum diisikan (IRS dan KHS) atau tidak digunakan
                      </p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex w-5 h-5 border border-blue-600 bg-blue-600"></div>
                      <p className="flex ml-5">Sudah diisikan (IRS dan KHS)</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex w-5 h-5 border border-yellow-600 bg-yellow-600"></div>
                      <p className="flex ml-5">Sudah Lulus PKL (IRS, KHS, dan PKL)</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex w-5 h-5 border border-green-600 bg-green-600"></div>
                      <p className="flex ml-5">Sudah Lulus skripsi </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}
