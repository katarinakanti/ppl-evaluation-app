"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createPkl } from "./pkl-submit";
import { Dosen } from "@/data/dosen";
import { Button } from "@/components/Button";

export default function CreatePkl({ dosen }: { dosen: Dosen[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPkl, initialState);
  const { pending } = useFormStatus();
  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Praktek Kerja Lapangan (PKL)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">PKL</p>
      </div>
      <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center">
          <div className="flex-col ml-8 mt-20">
            {/* <div className="flex w-full mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">
                Dosen Pembimbing
              </p>
              <div className="flex items-center ml-28">
                <select
                  className="p-2 border border-gray-300 bg-white"
                  name="dosen_pembimbing_nip"
                  id="dosen_pembimbing_nip"
                >
                  <option>Pilih Dosen Pembimbing</option>
                  {dosen.map((d) => (
                    <option key={d.nip} value={d.nip}>
                      {d.nama}
                    </option>
                  ))}
                </select>{" "}
              </div>
              {state.errors?.dosen_pembimbing_nip && (
                <div
                  id="dosen_pembimbing-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.dosen_pembimbing_nip.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div> */}
            <div className="flex w-full -mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">
                Semester
              </p>
              <div className="flex items-center ml-28">
              <select
                className="w-80 p-2 border border-gray-300 bg-white"
                name="semester"
                id="semester"
              >
                <option value="" disabled selected hidden>
                  Minimal semester 5 atau 6
                </option>
                {Array.from({ length: 10 }, (_, index) => index + 5).map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>{" "}
              </div>
              {state.errors?.semester && (
                <div
                  id="semester-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.semester.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full -mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">
                Waktu Seminar
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="p-2 border border-gray-300 bg-white"
                  type="date"
                  id="waktu_pkl"
                  name="waktu_pkl"
                  placeholder="Dalam bulan"
                />{" "}
              </div>
              {state.errors?.waktu_pkl && (
                <div
                  id="waktu_pkl-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.waktu_pkl.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full -mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">Nilai</p>
              <div className="flex items-center ml-28">
                <select
                  className="p-2 border border-gray-300 bg-white"
                  name="nilai_pkl"
                  id="nilai_pkl"
                >
                  <option>Masukkan Nilai</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>{" "}
              </div>
              {state.errors?.nilai_pkl && (
                <div
                  id="nilai_pkl-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.nilai_pkl.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full mt-10">
              <p className="flex items-center w-64 p-10 font-semibold">
                Upload Berita Acara PKL
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="w-80 p-2 border border-gray-300 bg-white"
                  type="file"
                  name="file"
                  id="file"
                />{" "}
              </div>
              {state.errors?.file && (
                <div
                  id="file-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.file.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <Button />
          </div>
        </div>
      </form>
    </>
  );
}
