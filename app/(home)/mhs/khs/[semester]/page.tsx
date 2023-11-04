export default function Page() {
  return (
    <>
    <link rel="stylesheet" href="view.css" />
      <div className="text-center mt-10 text-3xl font-semibold">
            <h2>Kartu Hasil Studi (KHS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">Entry Kartu Hasil Studi</p>
      </div>
      <div className="mx-auto bg-gray-100 w-10/12 h-fit">        
        <br />    
        <p className="text-center text-4xl">Semester 1</p>        

        <div className="flex items-center">
          <div className="flex-col ml-8">
            
            <div className="flex w-full -mt-3">
              <div>
              <p className="flex items-center w-60 p-10 font-semibold">SKS Semester</p>              
              </div>
              <div className="flex items-center ml-80"> :
                  <p className="ml-10 w-80 p-2">21</p>       
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">IP Semester</p>
              <div className="flex items-center ml-80" > :
                    <p className="ml-10 w-80 p-2 ">4.00</p>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">SKS Kumulatif</p>
              <div className="flex items-center ml-80" > :
              <p className="ml-10 w-80 p-2">21</p>
              </div>
            </div>

              <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">IP Kumulatif</p>
                <div className="flex items-center ml-80" > :
                <p className="ml-10 w-80 p-2">4.00</p>
                </div>
              </div>

              <div className="flex w-full mt-7">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">Scan KHS</button>
                  {" "}
              </div>
              <div className="flex w-full mt-5 mb-10">
                <button className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded">Ubah</button>
                    {" "}
              </div>
          </div>

          </div>
        </div >      
    </>
  );
}


