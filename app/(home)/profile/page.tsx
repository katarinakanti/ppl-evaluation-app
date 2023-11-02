import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .match({ is_complete: false });

  return (
    <>
      {/* <h1>Homepage</h1>
      <h1>Hello, {session.user.user_metadata.nama}</h1> */}
      {/* <div className="mt-16 justify-center mx-auto bg-gray-100 w-10/12 h-48"> 
          <img className="flex items-center mt-10 ml-10 h-150 w-150 rounded-full" src="/img/slide1.jpg" alt="Foto_Mahasiswa" height={150} width={150}/>
          <h1 className="font-arial font-bold flex-row ml-60 mb-20 text-xl">Abigail Metanoia Melody</h1>
          <h4 className="font-arial">NiIM: 24060121120038</h4>
      </div> */}
      <div className="flex mb-8 mt-10 mx-auto bg-gray-100 w-10/12 h-48">
        <div className="flex items-center justify-center ml-10">
          <img
            className="h-150 w-150 rounded-full"
            src="/img/slide1.jpg"
            alt="Foto_Mahasiswa"
            height={150}
            width={150}
          />
        </div>

        <div className="flex items-center justify-center ml-10">
          <div className="flex-col w-full">
            <p className="text-4xl mb-5 font-arial font-semibold text-left">Abigail Metanoia Melody</p>

            <div className="flex">
              <p className="text-lg font-arial font-extralight">NIM : 240601211200038</p>
              <p className="ml-32 text-lg font-arial font-extralight">Informatika</p>
            </div>
          </div>
        </div>
        
      </div>

      <div className="flex mx-auto bg-gray-300 w-10/12 h-10">
        <p className="flex items-center ml-5 font-arial">Profil</p>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">

        <div className="flex mx-auto pt-14">

          <div className="flex items-center ml-24 justify-center">

            <div className="flex-col items-center w-1/6 justify-center">
              <img
                src="/img/slide1.jpg"
                alt="Foto_Mahasiswa"
                height={350}
                width={350}
              />
              <p className="mt-3 text-center text-xl font-arial font-medium">
                2023/2024
              </p>
              <p className="mt-3 bg-lime-500 text-white mx-auto w-2/3 rounded py-1 text-center text-medium font-medium">
                Aktif
              </p>            
            </div>

            <div className="flex flex-col items-center ml-32">
              <div className="text-left font-arial font-medium">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th className="w-56">NIM</th>
                      <td>24060121120038</td>
                    </tr>
                    <tr>
                      <th>Nama Lengkap</th>
                      <td>
                        <input  className="p-2 border border-gray-300 bg-white" type="text" placeholder="Nama" />
                      </td>
                    </tr>
                    <tr>
                      <th>Angkatan</th>
                      <td>2021</td>
                    </tr>
                    <tr>
                      <th>Jalur Masuk</th>
                      <td>
                        <select className="p-2 border border-gray-300 bg-white" name="status" id="Status">
                          <option selected>Pilih Jalur Masuk</option>
                          <option value="belumPKL">SNMPTN</option>
                          <option value="sedangPKL">SBMPTN</option>
                          <option value="sudahPKL">Jalur Mandiri</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Nomor HP</th>
                      <td>
                        <input  className="p-2 border border-gray-300 bg-white" type="tel" placeholder="Nomor Telepon" /> 
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                      <input  className="p-2 border border-gray-300 bg-white" type="text" placeholder="Email Pribadi" />
                      </td>
                    </tr>
                    <tr>
                      <th>Alamat Asal</th>
                      <td>
                      <input  className="p-2 border border-gray-300 bg-white" type="text" placeholder="Alamat Asal" />
                      </td>
                    </tr>
                    <tr>
                      <th>Kab/Kota</th>
                      <td>
                        <input  className="p-2 border border-gray-300 bg-white" type="text" placeholder="Kabupaten/Kota" />
                      </td>
                    </tr>
                    <tr>
                      <th>Propinsi</th>
                      <td>
                        <input  className="p-2 border border-gray-300 bg-white" type="text" placeholder="Propinsi" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <table className="w-full">
                  <tbody>
                  </tbody>
                </table> */}

                </div>
              </div>
          </div> 
        </div>

        <div className="flex mt-10 justify-end mr-28">
          <button className="bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-7 py-1 font-semibold rounded mb-5">Simpan</button>
        </div>
      </div>
    </>
  );
}


{/* <div className="flex items-center ml-10">
          <div>
            <button>
              <p className="text-xl mb-5 font-arial font-semibold text-left">
                Abigail Metanoia Melody
              </p>

              <div className="flex flex-col">
                <div className="flex w-full font-medium justify-between">
                  <p className="text-sm font-arial font-extralight">
                    NIM : 240601211200038
                  </p>
                </div>
                <div>
                  <p className="flex w-full mt-5 text-left text-sm c font-extralight">
                    Informatika
                  </p>
                </div>
              </div>

            </button>
          </div>
        </div> */}