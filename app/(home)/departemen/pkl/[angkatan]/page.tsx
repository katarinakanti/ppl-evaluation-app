import React, { useState } from 'react';

export default function Page() {
  return (
    <div>
        <br />
        <br />
        <h1 className="text-center text-4xl font-bold font-arial">
        Data PKL Mahasiswa - Angkatan 2019</h1>
        <br />
        <br />

        
        <table className="w-full">
            <thead className="text-center border bg-gray-300">
              <tr className="flex">
                <th className="w-full border border-white">No</th>
                <th className="w-full border border-white">NIM</th>
                <th className="w-full border border-white">Nama Mahasiswa</th>
                <th className="w-full border border-white">Status</th>
                <th className="w-full border border-white">Angkatan</th>
                <th className="w-full border border-white">Status PKL</th>
                <th className="w-full border border-white">Waktu (bulan)</th>
                <th className="w-full border border-white">Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border flex">
                <td className="w-full border border-gray-300 bg-white">1</td>
                <td className="w-full border border-gray-300 bg-white">24060121120038</td>
                <td className="w-full border border-gray-300 bg-white">Abigail Metanoia Melody</td>
                <td className="w-full border border-gray-300 bg-white">Aktif</td>
                <td className="w-full border border-gray-300 bg-white">2020</td>
                <td className="w-full border border-gray-300 bg-white">Lulus</td>
                <td className="w-full border border-gray-300 bg-white">3</td>
                <td className="w-full border border-gray-300 bg-white">A</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="text-center border flex">
                <td className="w-full border border-gray-300 bg-white">2</td>
                <td className="w-full border border-gray-300 bg-white">24060121130054</td>
                <td className="w-full border border-gray-300 bg-white">Salsabila Tuada</td>
                <td className="w-full border border-gray-300 bg-white">Aktif</td>
                <td className="w-full border border-gray-300 bg-white">2020</td>
                <td className="w-full border border-gray-300 bg-white">Lulus</td>
                <td className="w-full border border-gray-300 bg-white">2</td>
                <td className="w-full border border-gray-300 bg-white">A</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="text-center border flex">
                <td className="w-full border border-gray-300 bg-white">3</td>
                <td className="w-full border border-gray-300 bg-white">24060121130058</td>
                <td className="w-full border border-gray-300 bg-white">Agustina Mita Amalia</td>
                <td className="w-full border border-gray-300 bg-white">Aktif</td>
                <td className="w-full border border-gray-300 bg-white">2020</td>
                <td className="w-full border border-gray-300 bg-white">Lulus</td>
                <td className="w-full border border-gray-300 bg-white">3</td>
                <td className="w-full border border-gray-300 bg-white">A</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="text-center border flex">
                <td className="w-full border border-gray-300 bg-white">4</td>
                <td className="w-full border border-gray-300 bg-white">24060121130060</td>
                <td className="w-full border border-gray-300 bg-white">Katarina Kanti</td>
                <td className="w-full border border-gray-300 bg-white">Aktif</td>
                <td className="w-full border border-gray-300 bg-white">2020</td>
                <td className="w-full border border-gray-300 bg-white">Lulus</td>
                <td className="w-full border border-gray-300 bg-white">2</td>
                <td className="w-full border border-gray-300 bg-white">A</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="text-center border flex">
                <td className="w-full border border-gray-300 bg-white">5</td>
                <td className="w-full border border-gray-300 bg-white">24060121130050</td>
                <td className="w-full border border-gray-300 bg-white">Mutiara Permata</td>
                <td className="w-full border border-gray-300 bg-white">Aktif</td>
                <td className="w-full border border-gray-300 bg-white">2020</td>
                <td className="w-full border border-gray-300 bg-white">Lulus</td>
                <td className="w-full border border-gray-300 bg-white">3</td>
                <td className="w-full border border-gray-300 bg-white">A</td>
              </tr>
            </tbody>
          </table>


          <br />
          <br />
          <div className="flex w-full -mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">
                Mahasiswa Sudah PKL
              </p>
              <div className="flex items-center ml-7">
                {" "}
                :<p className="ml-10 w-80 p-2">40</p>
                          {" "}
              </div>
            </div>

            <div className="flex w-full mt-5 mb-10">
                <button className="w-32 h-10 ml-10 bg-white hover:bg-red-100 text-red-400 border border-red-400 px-10 font-semibold rounded">
                  Cetak
                </button>
            </div>
          <br />
    </div>
  );
}
