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
        <div className="mx-auto bg-gray-100 w-10/12 h-fit">        
          <br />           
  
          <div className="flex items-center">
            <div className="flex-col ml-8">
              
              <div className="flex w-full -mt-3">
                <div>
                <p className="flex items-center w-60 p-10 font-semibold">Dosen Pembimbing</p>              
                </div>
                <div className="flex items-center ml-80"> :
                    <p className="ml-10 w-80 p-2">Guruh Aryotejo, S.Kom., M.Sc.</p>       
                </div>
              </div>
  
              <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">Waktu</p>
                <div className="flex items-center ml-80" > :
                      <p className="ml-10 w-80 p-2 ">2</p>
                </div>
              </div>
  
              <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">Status</p>
                <div className="flex items-center ml-80" > :
                <p className="ml-10 w-80 p-2">Sudah PKL</p>
                </div>
              </div>
  
                <div className="flex w-full -mt-10">
                  <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
                  <div className="flex items-center ml-80" > :
                  <p className="ml-10 w-80 p-2">A</p>
                  </div>
                </div>
  
                <div className="flex w-full mt-7">
                <button className="w-60 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 font-semibold rounded">Lihat Berita Acara Seminar PKL</button>
                    {" "}
                </div>
                <div className="flex w-full mt-5 mb-10">
                  <button className="w-32 h-10 ml-10 btn-primary">Ubah</button>
                      {" "}
                </div>
            </div>
  
            </div>
          </div >      
      </>
    );
  }
  
  
  