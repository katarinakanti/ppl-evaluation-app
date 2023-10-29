export default function Page() {
  return (
    <>
    <link rel="stylesheet" href="view.css" />
      <div className="text-center mt-10 text-3xl font-semibold">
            <h2>Skripsi</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-11/12 h-16">
        <p className="text-center">Skripsi</p>
      </div>
      <div className="flex items-center  mx-auto bg-gray-100 w-11/12 h-96">
            <div className="mb-52 ml-10 mt-36" > 
              <p className="mt-10 font-semibold">Dosen Pembimbing</p>
              <p className="mt-10 font-semibold">Lama Studi</p>
              <p className="mt-10 font-semibold">Tanggal Lulus Sidang</p>
              <p className="mt-10 font-semibold">Status</p>
              <p className="mt-10 font-semibold">Nilai</p>
            </div>
            <div className="mb-10 ml-32" > 
            <div> 
                <select name="dospem" id="dospem">
                  <option selected>Pilih Dosen Pembimbing</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mt-10" >
                <input name="semester" placeholder="Lama Studi(Semester)"/>
              </div>
              <div className="mt-10" > 
                <input type="date" id="tanggal" name="tanggal"/> 
              </div>
              <div className="mt-10" > 
                <select name="status" id="Status">
                  <option selected>Belum Skripsi, Sedang Skripsi, Sudah Skripsi</option>
                  <option value="belumSkripsi">Belum Skripsi</option>
                  <option value="sedangSkripsi">Sedang Skripsi</option>
                  <option value="sudahSkripsi">Sudah Skripsi</option>
                </select>
              </div>
              <div className="mt-10" > 
                <select name="nilai" id="nilai">
                  <option selected>A,B,C,D,E</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
        </div> 
      </div >
      <div className="flex items-center  mx-auto bg-gray-100 w-11/12 h-12">
          <div className="mb-24 ml-10 mt-36">
            <button className="btn-outline-primary">Upload Berita Acara Skripsi</button>
            <div className="mt-5">
              <button className="btn-primary">Simpan</button>
            </div> 
          </div>
      </div>
    </> 
  );
}
