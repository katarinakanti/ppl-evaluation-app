"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateMhs } from "@/actions/auth";

export default function  GenerateForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateMhs, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Generate Akun Mahasiswa Baru</h2>
      </div>
      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col ml-8 mt-8">          
          <div className="flex w-full">
            <p>
              <label className="mt-5 flex items-center w-60 p-10" htmlFor="no_induk">NIM</label>
            </p>
            <div className="mt-5 flex items-center ml-36">
              <input className="w-96 p-1 border border-gray-300 bg-white" type="text" name="no_induk" id="no_induk" placeholder="Add text"/>
            </div>
          </div>

            <div className="flex w-full -mt-10">
              <p>
                <label className="flex items-center w-60 p-10" htmlFor="nama">Nama</label>
              </p> 
              <div className="flex items-center ml-36">
                <input className="w-96 p-1 border border-gray-300 bg-white" type="text" name="nama" id="nama" placeholder="Add Text"/>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p>
                <label className="flex items-center w-60 p-10" htmlFor="angkatan">Angkatan</label>
              </p>          
              <div className="flex items-center ml-36">
                <input className="w-96 p-1 border border-gray-300 bg-white" type="text" name="angkatan" id="angkatan" placeholder="Add Text"/>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p>
                <label className="flex items-center w-60 p-10" htmlFor="status">Status</label>
              </p>          
              <div className="flex items-center ml-36">
                <select className="w-96 p-1 border border-gray-300 bg-white" name="status" id="status">
                  <option value="pilih">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Mangkir">Mangkir</option>
                  <option value="Lulus">Lulus</option>
                  <option value="Drop Out">Drop Out</option>
                </select>
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p>
              <label className="flex items-center w-60 p-10" htmlFor="status">Dosen Wali</label>
              </p>
              <div className="flex items-center ml-36">
                <select className="w-96 p-1 border border-gray-300 bg-white" name="status" id="status">
                  <option value="pilih">Pilih Dosen Wali</option>
                  <option value="1">Dosen 1</option>
                  <option value="2">Dosen 2</option>
                  <option value="3">Dosen 3</option>
                  <option value="4">Dosen 4</option>
                  <option value="5">Dosen 5</option>
                </select>
              </div>
            </div>

          </div>

          <div className="flex w-full justify-end">
            <div className="flex items-center mr-20">
              <button 
                disabled={pending}
                className="mb-10 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-2 rounded">
                {pending ? "Loading..." : "Generate"}
              </button>
            </div>                     
          </div>

      </div>
    </form>
  );
}
