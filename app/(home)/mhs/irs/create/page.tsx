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
              <div className="flex items-center ml-28">
                <input
                  className="w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="semester"
                  id="semester"
                  min="1"
                  max="14"
                  step="1"
                  placeholder="1 - 14"
                  required
                />
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Jumlah SKS Semester
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="skss"
                  id="skss"
                  min="0"
                  max="24"
                  step="1"
                  placeholder="0 - 24"
                  required
                />
                          {" "}
              </div>
            </div>

            <div className="flex w-full mt-7">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">Scan IRS</button>
                  {" "}
            </div>
            <div className="flex w-full mt-5 mb-10">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded">Simpan</button>
                  {" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
