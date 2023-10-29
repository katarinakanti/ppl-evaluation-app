export default function Page() {
    return (
      <>
      <link rel="stylesheet" href="view.css" />
        <div className="text-center mt-10 text-3xl font-semibold">
              <h2>Kartu Hasil Studi (KHS)</h2>
        </div>
        <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-11/12 h-16">
          <p className="text-center bold">Entry Kartu Hasil Studi Semester 1</p>
        </div>

        <div className="flex items-center  mx-auto bg-gray-100 w-11/12 h-96">
              <div className="mb-52 ml-10 mt-36" > 
                <p className="mt-10 font-semibold">SKS Semester</p>
                <p className="mt-10 font-semibold">IP Semester</p>
                <p className="mt-10 font-semibold">SKS Kumulatif</p>
                <p className="mt-10 font-semibold">IP Kumulatif</p>
              </div>
              <div className="mb-10 ml-32 mr-50" > 
                    <input
                        type="number"
                        name="skss"
                        id="skss"
                        min="0"
                        max="24"
                        step="1"
                        placeholder="0 - 24"
                        required
                    />
                
                <div className="mt-10 mr-50" > 
                    <input
                        type="number"
                        name="ips"
                        id="ips"
                        min="0.0"
                        max="0.4"
                        step="0.1"
                        placeholder="0.0 - 4.0"
                        required
                    />
                </div>
                <div className="mt-10 mr-50" > 
                    <input
                        type="number"
                        name="sksk"
                        id="sksk"
                        min="0"
                        max="144"
                        step="1"
                        placeholder="0 - 144"
                        required
                    />
                </div>
                <div className="mt-10 mr-50" > 
                    <input
                        type="number"
                        name="sksk"
                        id="sksk"
                        min="0.0"
                        max="4.0"
                        step="0.1"
                        placeholder="0.0 - 4.0"
                        required
                    />
                </div>
          </div> 
        </div >
        <div className="flex items-center  mx-auto bg-gray-100 w-11/12 h-12">
            <div className="mb-56 ml-10 mt-36">
              <button className="btn-outline-primary">Scan KHS</button>
              <div className="mt-5">
                <button className="btn-primary">Simpan</button>
              </div> 
            </div>
        </div>
      </>
    );
  }