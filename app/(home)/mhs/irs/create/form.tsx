"use client";

import { useFormState } from "react-dom";
import { createIrs } from "./irs-submit";
import { Irs } from "@/data/irs";
import { Button } from "@/components/Button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useEffect } from "react";

export default function CreateIrs({ data }: { data: Irs[] }) {
  const { toast } = useToast();
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createIrs, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: state.message,
        action: <ToastAction altText="Tutup">Tutup</ToastAction>,
      });
    }
  }, [state.message]);
  console.log("state", state);
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
                  {Array.from(
                    { length: data.length + 1 },
                    (_, index) => index + 1
                  ).map((semester) => (
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

            <div className="flex w-full mt-5 mb-10">
              <Button />
                  {" "}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
