"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateIrs } from "./irs-submit";
import { Irs } from "@/data/irs";
import { getFileUrl } from "@/utils/functions";
import { Button } from "@/components/Button";

export default function UpdateIrs({ data }: { data: Irs }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateIrs, initialState);
  const { pending } = useFormStatus();

  return (
    <>
      {/* <link rel="stylesheet" href="view.css" /> */}
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Isian Rencana Semester (IRS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">IRS</p>
      </div>
      <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
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
                  placeholder="1 - 14"
                  defaultValue={data.semester}
                  readOnly
                />
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
              <p className="flex items-center w-60 p-10 font-semibold">
                Jumlah SKS Semester
              </p>
              <div className="flex items-center ml-28">
                <input
                  className="w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="sks_diambil"
                  id="sks_diambil"
                  placeholder="0 - 24"
                  defaultValue={data.sks_diambil}
                />
                          {" "}
              </div>
              {state.errors?.sks_diambil && (
                <div
                  id="sks-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.sks_diambil.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Scan IRS
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
                    href={getFileUrl(data.scan_irs)}
                    target="_blank"
                    className="bg-blue-100 hover:bg-blue-200 p-2"
                  >
                    Lihat file lama: {data.scan_irs}
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
            <div className="flex w-full mt-5 mb-10">
              <Button />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
