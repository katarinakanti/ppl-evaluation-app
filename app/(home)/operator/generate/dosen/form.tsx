"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateMhs } from "./form-submit";
import { Button } from "@/components/Button";

export default function GenerateDosen() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateMhs, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Generate Akun Dosen Baru</h2>
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
                placeholder="Nama lengkap dosen..."
              />
            </div>
          </div>

          <div className="flex w-full -mt-10">
            <p>
              <label className="mt-5 flex items-center w-60 p-10" htmlFor="nip">
                NIP
              </label>
            </p>
            <div className="mt-5 flex items-center ml-24">
              <input
                className="w-96 p-1 border border-gray-300 bg-white"
                type="text"
                name="nip"
                id="nip"
                placeholder="NIP dosen..."
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <div className="flex items-center mr-20">
            <Button />
          </div>
        </div>
      </div>
    </form>
  );
}
