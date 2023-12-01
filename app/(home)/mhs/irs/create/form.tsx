"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createIrs } from "./irs-submit";

export default function CreateIrs() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createIrs, initialState);
  const { pending } = useFormStatus();
  return (
    <>
      <link rel="stylesheet" href="view.css" />
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
                <select
                  className="w-80 p-2 border border-gray-300 bg-white"
                  name="semester"
                  id="semester"
                  placeholder="1 - 14"
                >
                  {Array.from({ length: 14 }, (_, index) => index + 1).map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
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
                          {" "}
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

            <div className="flex w-full mt-7">
              <button className="w-32 h-10 ml-10 bg-white hover:bg-pink-100 text-pink-400 border border-pink-400 font-semibold rounded">
                Scan IRS
              </button>
                  {" "}
            </div>
            <div className="flex w-full mt-5 mb-10">
              <button
                disabled={pending}
                type="submit"
                className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded"
              >
                {pending ? "Saving..." : "Simpan"}
              </button>
                  {" "}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
