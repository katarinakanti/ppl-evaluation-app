"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateMhs } from "./form-submit";
import { Dosen } from "@/data/dosen";

export default function GenerateMhs({ dosen }: { dosen: Dosen[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateMhs, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Generate Akun Mahasiswa Baru</h2>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col ml-16 mt-8">
          <div className="flex w-full">
            <p>
              <label
                className="mt-5 flex items-center w-60 p-10"
                htmlFor="nama"
              >
                Nama
              </label>
            </p>
            <div className="mt-5 flex items-center ml-24">
              <input
                className="w-96 p-1 border border-gray-300 bg-white"
                type="text"
                name="nama"
                id="nama"
                placeholder="Nama lengkap mahasiswa..."
              />
            </div>
          </div>

          <div className="flex w-full -mt-10">
            <p>
              <label className="mt-5 flex items-center w-60 p-10" htmlFor="nim">
                NIM
              </label>
            </p>
            <div className="mt-5 flex items-center ml-24">
              <input
                className="w-96 p-1 border border-gray-300 bg-white"
                type="text"
                name="nim"
                id="nim"
                placeholder="Add text"
              />
            </div>
          </div>

          <div className="flex w-full -mt-10">
            <p>
              <label className="flex items-center w-60 p-10" htmlFor="angkatan">
                Angkatan
              </label>
            </p>
            <div className="flex items-center ml-24">
              <input
                className="w-96 p-1 border border-gray-300 bg-white"
                type="number"
                name="angkatan"
                id="angkatan"
                placeholder="Add Text"
              />
            </div>
          </div>

          <div className="flex w-full -mt-10">
            <p>
              <label className="flex items-center w-60 p-10" htmlFor="status">
                Status
              </label>
            </p>
            <div className="flex items-center ml-24">
              <p>Aktif</p>
              {/* <select
                className="w-96 p-1 border border-gray-300 bg-white"
                name="status"
                id="status"
              >
                <option value="Pilih">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Mangkir">Mangkir</option>
                <option value="Lulus">Lulus</option>
                <option value="Drop Out">Drop Out</option>
              </select> */}
            </div>
          </div>

          <div className="flex w-full -mt-10">
            <p>
              <label
                className="flex items-center w-60 p-10"
                htmlFor="doswal_nip"
              >
                Dosen Wali
              </label>
            </p>
            <div className="flex items-center ml-24">
              <select
                className="w-96 p-1 border border-gray-300 bg-white"
                name="doswal_nip"
                id="doswal_nip"
              >
                {dosen.map((d) => (
                  <option key={d.nip} value={d.nip}>
                    {d.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <div className="flex items-center mr-20">
            <button
              disabled={pending}
              className="mb-10 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-2 rounded"
            >
              {pending ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
