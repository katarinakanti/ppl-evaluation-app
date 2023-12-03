import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function OperatorDashboard({ session }: { session: Session }) {
  return (
    <>
      <div className="flex mb-8 mt-10 mx-auto bg-gray-100 w-10/12 h-48">
        <div className="flex items-center justify-center ml-10">
          <Image
            className="h-150 w-150 rounded-full"
            src={"/img/slide1.jpg"}
            alt={`Foto`}
            height={150}
            width={150}
          />
        </div>

        <div className="flex items-center justify-center ml-10">
          <div className="flex-col w-full">
            <p className="text-4xl mb-5 font-arial font-semibold text-left">
              {session!.user.user_metadata.nama}
            </p>

            <div className="flex">
              <p className="text-lg font-arial font-extralight">
                NIP : {session.user.user_metadata.no_induk}
              </p>
              <p className="ml-32 text-lg font-arial font-extralight">
                Informatika
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex mx-auto w-10/12">
        <div className="mb-8 mt-10 mx-auto w-9/12 h-64">
          <div className= "flex-col w-full">
            <div className = "bg-gray-200 h-14 flex items-center ">
              <p className="ml-10 text-lg">Status Akademik</p>
            </div>
            <div className = "bg-gray-100 h-48 flex items-center ">
              <p className="ml-10 text-lg"></p>
            </div>
          </div>

        </div> */}

        <div className="flex mx-auto w-10/12">
        <div className="mb-8 mx-auto w-full h-96">
          <div className= "flex-col mt-5 w-full">
          <div className = "bg-gray-200 h-14 flex items-center "></div>
            <div className = "flex-col h-full bg-gray-100 ">
              <div className="flex w-full">
              <Link className="flex items-center justify-center mb-10 mt-10 ml-auto  bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/mhs"}>
                  <p className="text-xl">Data Mahasiswa</p>
                </Link>
                <Link className="flex items-center justify-center mb-8 mt-10 ml-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/generate/mhs"}>
                  <p className="text-xl">Generate Mahasiswa</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 mt-10 ml-auto bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/generate/dosen"}>
                  <p className="text-xl">Generate Dosen</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 mt-10 ml-auto mr-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/generate/csv"}>
                  <p className="text-xl">Generate CSV</p>
                </Link>
              </div>
              <div className="flex pb-1">
                <Link className="flex items-center justify-center mb-8 ml-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/irs"}>
                  <p className="text-xl">IRS</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 ml-auto bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/khs"}>
                  <p className="text-xl">KHS</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 ml-auto  bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/pkl"}>
                  <p className="text-xl">PKL</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 ml-auto mr-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/operator/skripsi"}>
                  <p className="text-xl">Skripsi</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* <div className=" ml-10 mb-8 mt-10 mx-auto w-3/12 h-64">
          <div className= "flex-col w-full"> 
            <Link className = "bg-gray-100 h-12 flex items-center justify-center" href={"/operator/generate/mhs"}>Generate Mahasiswa</Link>
            <Link className = "bg-gray-100 h-12 mt-5 flex items-center justify-center" href={"/operator/generate/dosen"}>Generate Dosen</Link>
            <Link className = "bg-gray-100 h-12 mt-5 flex items-center justify-center" href={"/operator/generate/csv"}>Generate CSV</Link>
          </div>
        </div> */}

    </>
  );
}
