import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function DepartemenDashboard({ session }: { session: Session }) {
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

      <div className="flex mx-auto w-10/12">
        <div className="mb-8 mx-auto w-full h-96">
          <div className= "flex-col mt-5 w-full">
          <div className = "bg-gray-200 h-14 flex items-center "></div>
            <div className = "flex-col h-full bg-gray-100 ">
              <div className="flex w-full">
                <Link className="flex flex-col items-center justify-center mb-8 mt-10 ml-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"/departemen/progress"}>
                  <p className="text-2xl">Progress</p>
                  <p className="text-2xl">Mahasiswa</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 mt-10 ml-auto bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"departemen/pkl"}>
                  <p className="text-2xl">PKL</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 mt-10 ml-auto  bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"departemen/skripsi"}>
                  <p className="text-2xl">Skripsi</p>
                </Link>
                <Link className="flex items-center justify-center mb-10 mt-10 ml-auto mr-10 bg-indigo-200 w-64 h-52 hover:bg-indigo-300" href={"departemen/status"}>
                  <p className="text-2xl">Status</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>

      {/* <div>
        <div className= "flex-col w-10/12 mx-auto"> 
            <Link className = "text-xl bg-gray-100 h-14 flex items-center justify-center" href={"/departemen/status"}>Status</Link>
            <Link className = "text-xl bg-gray-100 h-14 mt-5 flex items-center justify-center" href={"/departemen/irs"}>IRS</Link>
            <Link className = "text-xl bg-gray-100 h-14 mt-5 flex items-center justify-center" href={"/departemen/khs"}>KHS</Link>
            <Link className = "text-xl bg-gray-100 h-14 mt-5 flex items-center justify-center" href={"/departemen/pkl"}>PKL</Link>
            <Link className = "text-xl bg-gray-100 h-14 mt-5 flex items-center justify-center" href={"/departemen/skripsi"}>Skripsi</Link>
        </div>
      </div> */}
    </>
  );
}
