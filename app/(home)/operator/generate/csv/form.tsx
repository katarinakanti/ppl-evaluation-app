"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Dosen } from "@/data/dosen";
import { Button } from "@/components/Button";
import { generateMhsCsv } from "./form-submit";
import CSVReader from "@/components/CSVReader";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateMhsCsv, initialState);

  return (
    <form action={dispatch}>
      <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Generate Akun Mahasiswa Baru</h2>
      </div>

      <div className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex-col ml-16 mt-8">
          <a
            className="mt-5 flex items-center w-60 p-10 hover:underline"
            target="_blank"
            href="https://drive.google.com/drive/folders/1lQrBh7Ex6Gur67EcvGJIRVqrw7BxVNUH?usp=drive_link"
          >
            Download Template
          </a>
          <div className="flex w-full">
            <p>
              <label
                className="mt-5 flex items-center w-60 p-10"
                htmlFor="file"
              >
                Upload
              </label>
            </p>
            <div className="mt-5 flex items-center ml-24">
              <CSVReader />
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
