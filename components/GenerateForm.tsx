"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateMhs } from "@/actions/auth";

export default function GenerateForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(generateMhs, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="nama">Nama</label>
        <input type="text" name="nama" id="nama" />
      </div>
      <div>
        <label htmlFor="no_induk">NIM</label>
        <input type="text" name="no_induk" id="no_induk" />
      </div>
      <div>
        <label htmlFor="angkatan">Angkatan</label>
        <input type="text" name="angkatan" id="angkatan" />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <input type="text" name="status" id="status" />
      </div>
      <div>
        <button
          disabled={pending}
          className="bg-green-200 disabled:bg-green-600 disabled:cursor-not-allowed hover:bg-green-300"
        >
          {pending ? "Loading..." : "Generate"}
        </button>
      </div>
    </form>
  );
}
