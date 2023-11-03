import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({
params,
}: {
params: { semester: string };
}) {
const supabase = createServerComponentClient<Database>({ cookies });
const {
data: { session },
} = await supabase.auth.getSession();
const no_induk = session?.user.user_metadata.no_induk;

return (
<>
    <link rel="stylesheet" href="view.css" />
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Skripsi</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">Skripsi</p>
    
    </div>
    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col items-center">
            <div className="flex-col ml-14">
                <div className="flex w-full">
                    <div className="mt-16">
                        <p className="text-xl flex items-center font-semibold">
                            Abigail Metanoia Melody
                        </p>
                        <div className="flex">
                            <p className="text-sm flex items-center mt-5">NIM : 24060121120038</p>
                            <p className="ml-12 text-sm flex items-center mt-5">Jumlah Total SKS : 100</p>
                            <p className="ml-12 text-sm flex items-center mt-5">IPK : 4.00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-col ml-8">
                <div className="flex w-full mt-5">
                <div>
                <p className="flex items-center w-60 p-10 font-semibold">Dosen Pembimbing</p>              
                </div>
                <div className="flex items-center ml-32">
                    <select className="p-2 border border-gray-300 bg-white" name="dospem" id="dospem">
                    <option selected>Pilih Dosen Pembimbing</option>
                    <option value="1">Guruh Aryotejo, S.Kom., M.Sc.</option>
                    <option value="2">Budi Prasetyo, S.Kom,. M.Kom.</option>
                    <option value="3">Dinda Mustika, S.Kom., M.Sc.</option>
                    <option value="4">Putri Ayu, S.Kom., M.Kom.</option>
                    <option value="5">Gusti Wiranto, S.Kom., M. Sc.</option>
                    </select>              
                </div>
            </div>

            <div className="flex w-full -mt-10">
              <div>
              <p className="flex items-center w-60 p-10 font-semibold">Lama Studi</p>              
              </div>
              <div className="flex items-center ml-32" >
                  <input className="p-2 border border-gray-300 bg-white"  type="number" name="semester" placeholder="Semester"/>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">Tanggal Lulus/Sidang</p>
              <div className="flex items-center ml-32" > 
                <input className="p-2 border border-gray-300 bg-white" type="date" id="tanggal" name="tanggal"/>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">Status</p>
              <div className="flex items-center ml-32" > 
                <select className="p-2 border border-gray-300 bg-white" name="status" id="Status">
                  <option selected>Masukkan Status Skripsi</option>
                  <option value="belumSkripsi">Belum Skripsi</option>
                  <option value="sedangSkripsi">Sedang Skripsi</option>
                  <option value="sudahSkripsi">Sudah Skripsi</option>
                </select>
              </div>
            </div>

              <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
                <div className="flex items-center ml-32" > 
                  <select className="p-2 border border-gray-300 bg-white" name="nilai" id="nilai">
                    <option selected>Masukkan Nilai</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>
              </div>
            </div>
        </div>
        <div className="flex mt-10 justify-end mr-16">
            <button className="bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-7 py-1 font-semibold rounded mb-5">Ubah</button>
            <button className=" ml-5 bg-green-600 hover:bg-green-400 text-white  px-7 py-1 font-semibold rounded mb-5">Approved</button>
        </div>
    </div>
</>
);
}