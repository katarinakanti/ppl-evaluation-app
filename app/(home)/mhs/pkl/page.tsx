// import "./pkl.css";


export default function Page() {
  return (
    <>
    <link rel="stylesheet" href="view.css" />
      <div className="text-center mt-10 text-3xl font-semibold">
            <h2>Praktek Kerja Lapangan (PKL)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">PKL</p>
      </div>
      <div className="flex items-center  mx-auto bg-gray-100 w-10/12 h-fit">
          <div className="flex-col ml-8">
            <div className="flex w-full mt-5">
              <div>
              <p className="flex items-center w-60 p-10 font-semibold">Dosen Pembimbing</p>              
              </div>
              <div className="flex items-center ml-32">
                <select className="p-2 border border-gray-300 bg-white" name="dospem" id="dospem">
                  <option selected>Pilih Dosen Pembimbing</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>              
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">Waktu</p>
              <div className="flex items-center ml-32" > 
                <input className="p-2 border border-gray-300 bg-white" type="number" id="waktu" name="waktu"/>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">Status</p>
              <div className="flex items-center ml-32" > 
                <select className="p-2 border border-gray-300 bg-white" name="status" id="Status">
                  <option selected>Pilih Status PKL</option>
                  <option value="belumPKL">Belum PKL</option>
                  <option value="sedangPKL">Sedang PKL</option>
                  <option value="sudahPKL">Sudah PKL</option>
                </select>
              </div>
            </div>

              <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
                <div className="flex items-center ml-32" > 
                  <select className="p-2 border border-gray-300 bg-white" name="nilai" id="nilai">
                    <option selected>Pilih Nilai</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>
              </div>

            <div className="flex w-full mt-7">
              <button className="ml-10 btn-outline-primary">Upload Berita Acara PKL</button>
            </div>
              <div className="flex w-full mt-5 mb-10">
                <button className="ml-10 btn-primary">Simpan</button>
              </div> 

          </div>
        </div >      
    </>
  );
}
