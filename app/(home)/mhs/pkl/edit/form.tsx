"use client";

import { useFormState } from "react-dom";
import { updatePkl } from "./pkl-submit";
import { getFileUrl } from "@/utils/functions";
import { PklWithRelations } from "@/data/pkl";
import { Button } from "@/components/Button";
import { Dosen } from "@/data/dosen";

export default function UpdatePkl({
  data,
  dosen,
}: {
  data: PklWithRelations;
  dosen: Dosen[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updatePkl, initialState);
  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Praktek Kerja Lapangan (PKL)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16 ">
        <p className="text-center">PKL</p>
      </div>
      <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center">
          <div className="flex-col ml-8">
            <div className="flex w-full mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Dosen Pembimbing
              </p>
              <div className="flex items-center ml-28">
                <select
                  className="p-2 border border-gray-300 bg-white"
                  name="dosen_pembimbing_nip"
                  id="dosen_pembimbing_nip"
                  defaultValue={data?.dosen_pembimbing_nip}
                >
                  {dosen.map((d) => (
                    <option key={d.nip} value={d.nip}>
                      {d.nama}
                    </option>
                  ))}
                </select>{" "}
              </div>
              {state.errors?.dosen_pembimbing_nip && (
                <div
                  id="dosen_pembimbing_nip-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.dosen_pembimbing_nip.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Waktu PKL
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="p-2 border border-gray-300 bg-white"
                  type="date"
                  id="waktu_pkl"
                  name="waktu_pkl"
                  placeholder="Dalam bulan"
                  defaultValue={data?.waktu_pkl.toString()}
                />
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
              <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
              <div className="flex items-center ml-28">
                <select
                  className="p-2 border border-gray-300 bg-white"
                  name="nilai_pkl"
                  id="nilai_pkl"
                  defaultValue={data?.nilai_pkl}
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
            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Upload Berita Acara PKL
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="w-80 p-2 border border-gray-300 bg-white"
                  type="file"
                  name="file"
                  id="file"
                />
                <div>
                  <a
                    href={getFileUrl(data?.scan_pkl!)}
                    target="_blank"
                    className="bg-blue-100 hover:bg-blue-200 p-2"
                  >
                    Lihat file lama: {data?.scan_pkl}
                  </a>
                </div>
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
