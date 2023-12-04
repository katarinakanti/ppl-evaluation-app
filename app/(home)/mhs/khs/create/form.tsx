"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createKhs } from "./khs-submit";

export default function CreateKhs() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createKhs, initialState);
  const { pending } = useFormStatus();
  return (
    <>
      <link rel="stylesheet" href="view.css" />
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Kartu Hasil Studi (KHS)</h2>
      </div>
      <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
        <p className="text-center">Entry Kartu Hasil Studi</p>
              
      </div>
      <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
        {" "}
              
        <div className="flex items-center">
          <div className="flex-col ml-8">
            <div className="flex w-full mt-3">
              <div>
                <p className="flex items-center w-60 p-10 font-semibold">
                  Semester
                </p>
              </div>
              <div className="flex items-center ml-80">
                {" "}
                :
                <select
                  className="w-80 p-2 border border-gray-300 bg-white"
                  name="semester"
                  id="semester"
                  placeholder="1 - 14"
                >
                  {Array.from(
                    { length: data.length + 1 },
                    (_, index) => index + 1
                  ).map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
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
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                SKS Semester
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :
                <input
                  className="ml-20 w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="sks_semester"
                  id="sks_semester"
                  placeholder="0 - 24"
                />
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                IP Semester
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :
                <input
                  className="ml-20 w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="ip_semester"
                  id="ip_semester"
                  step="0.01"
                  placeholder="0.0 - 4.0"
                />
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                SKS Kumulatif
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :
                <input
                  className="ml-20 w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="sks_kumulatif"
                  id="sks_kumulatif"
                  placeholder="0 - 144"
                />
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                IP Kumulatif
              </p>
              <div className="flex items-center ml-80">
                {" "}
                :
                <input
                  className="ml-20 w-80 p-2 border border-gray-300 bg-white"
                  type="number"
                  name="ip_kumulatif"
                  id="ip_kumulatif"
                  step="0.01"
                  placeholder="0.0 - 4.0"
                />
                          {" "}
              </div>
            </div>

            <div className="flex w-full -mt-10">
              <p className="flex items-center w-60 p-10 font-semibold">
                Scan KHS
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
