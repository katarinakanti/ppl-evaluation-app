export default function Page() {
  return (
    <>
      <link rel="stylesheet" href="view.css" />
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Isian Rencana Semester (IRS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">IRS</p>
              
      </div>
      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center">
          <div className="flex-col ml-8">
            <div className="flex w-full mt-5">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Semester
                </p>
              </div>
              <div className="flex items-center ml-40"> :
                <p className="ml-10">1</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Jumlah SKS Semester
                </p>
              </div>
              <div className="flex items-center ml-40"> :
                <p className="ml-10">24</p>                
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Status Verifikasi
                </p>
              </div>
              <div className="flex items-center ml-40"> :
                <p className="ml-10">-</p>                
              </div>
            </div>

            <div className="flex w-full mt-7">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">Scan IRS</button>
                  {" "}
            </div>
            <div className="flex w-full mt-5 mb-10">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded">Ubah</button>
                  {" "}
            </div>
          </div>
        </div>          
      </div>
    </>

  );
}


{/* <div className="flex justify-end w-full">
              <div className="flex col mb-10 mr-10">
                <div className="flex w-full">
                  <button className="w-32 h-10 bg-white hover:bg-green-600 text-pink-400 border border-pink-400 font-semibold rounded">Lihat IRS</button>
                      {" "}
                </div>
                <div className="flex w-full">
                  <button className="bg-white hover:bg-green-600 text-blue-400 border border-blue-400 px-10 font-semibold rounded">Ubah</button>
                      {" "}
                </div>
                <div className="flex w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 rounded">Approved</button>
                      {" "}
                </div>
              </div>
            </div> */}