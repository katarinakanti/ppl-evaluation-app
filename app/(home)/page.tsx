import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
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
      <div className="flex mb-8 mt-16 mx-auto bg-gray-100 w-10/12 h-48">
        <div className="flex items-center justify-center ml-10">
          <img className="h-150 w-150 rounded-full" src="/img/slide1.jpg" alt="Foto_Mahasiswa" height={150} width={150}/>
        </div>
        <div className="flex items-center ml-10">
          <div>
            <button>
              <p className="text-xl mb-5 font-arial font-semibold text-left">
                Abigail Metanoia Melody
              </p>
              <div className="font-medium flex justify-between">
                <p className="text-left text-sm font-arial font-extralight">
                  NIM : 240601211200038
                </p>
                <p className=" mt-5 text-left text-sm c font-extralight">
                  Informatika
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex mx-auto bg-gray-300 w-10/12 h-10">
      <p className="flex items-center ml-5 font-arial">Profil</p>
      </div>
        <div className="flex mb-8 mx-auto bg-gray-100 w-10/12 h-fit">
          <div className="flex flex-col items-center mt-20 ml-20">
            <img src="/img/slide1.jpg" alt="Foto_Mahasiswa" height={350} width={350}/>
            <p className="mt-2 text-center text-xl font-arial font-medium">2023/2024</p>
          </div>
          <div className="flex flex-col mt-20 ml-48">
              <div className="text-left font-arial font-medium">
                <table>
                  <tr>
                    <th>NIM</th>
                    <div className="ml-32">
                      <td>24060121120038</td>
                    </div>
                  </tr>
                  <tr>
                    <th>Nama Lengkap</th>
                    <div className="ml-32">
                      {/* <td>ABIGAIL METANOIA MELODY</td> */}
                      <td>
                        <input type="text" placeholder="Nama" />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <th>Fakultas</th>
                    <div className="ml-32">
                      {/* <td>SAINS DAN MATEMATIKA</td> */}
                      <input type="text" placeholder="SAINS DAN MATEMATIKA" />
                    </div>
                  </tr>
                  <tr>
                    <th>Prodi</th>
                    <div className="ml-32">
                      {/* <td>Informatia S1</td> */}
                      <input type="text" placeholder="Informatia S1" />
                    </div>
                  </tr>
                  <tr>
                    <th>Angkatan</th>
                    <div className="ml-32">
                      {/* <td>2021</td> */}
                      <input type="text" placeholder="Angakatan" />
                    </div>
                  </tr>
  <br />
                  <tr>
                    <th>Tempat Lahir</th>
                    <div className="ml-32">
                      {/* <td>Semarang</td> */}
                      <input type="text" placeholder="Tempat Lahir" />
                    </div>
                  </tr>
                  <tr>
                    <th>Tanggal Lahir</th>
                    <div className="ml-32">
                      {/* <td>17 Juni 2003</td> */}
                      <input type="text" placeholder="Tanggal Lahir" />
                    </div>
                  </tr>
                  <tr>
                    <th>NIK</th>
                    <div className="ml-32">
                      {/* <td>337408 570603 0001</td> */}
                      <input type="text" placeholder="NIK" />
                    </div>
                  </tr>
                  <tr>
                    <th>Nama Ibu</th>
                    <div className="ml-32">
                      {/* <td>MARTHA EVELIN</td> */}
                      <input type="text" placeholder="Nama Ibu" />
                    </div>
                  </tr>
                  <tr>
                    <th>Kode Kewarganegaraan</th>
                    <div className="ml-32">
                      <td>ID</td>
                    </div>
                  </tr> 
  <br />
                  <tr>
                    <th>Nomor HP</th>
                    <div className="ml-32">
                      {/* <td>081994055237</td> */}
                      <input type="text" placeholder="Nomor HP" />
                    </div>
                  </tr>
                  <tr>
                    <th>Email SSO</th>
                    <div className="ml-32">
                      {/* <td>abigailmetanoia@students.undip.ac.id</td> */}
                      <input type="text" placeholder="Email SSO" />
                    </div>
                  </tr>
                  <tr>
                    <th>Email Pribadi</th>
                    <div className="ml-32">
                      {/* <td>abigailmetanoia17@gmail.com</td> */}
                      <input type="text" placeholder="Email Pribadi" />
                    </div>
                  </tr>
                  <tr>
                    <th>Alamat Asal</th>
                    <div className="ml-32">
                      {/* <td>Jl. KedungMundu Lama 189E KedungMundu RT 2 RW 5</td> */}
                      <input type="text" placeholder="Alamat Asal" />
                    </div>
                  </tr>
                  <tr>
                    <th>Alamat Sekarang</th>
                    <div className="ml-32">
                      {/* <td>-</td> */}
                      <input type="text" placeholder="Alamat Sekarang" />
                    </div>
                  </tr>  
                  <br />
                  <br /> 
                </table>
              </div>
              <button className="btn-primary items-center mt-10">Simpan</button>
              <br />
              <br />
        </div>
      </div>
    </>
  );
}
