"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createSkripsi } from "./skripsi-submit";
import { Dosen } from "@/data/dosen";
import { Button } from "@/components/Button";

export default function CreateSkripsi({ dosen }: { dosen: Dosen[] }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createSkripsi, initialState);
    const { pending } = useFormStatus();
    return (
        <>
        {/* <link rel="stylesheet" href="view.css" /> */}
        <div className="text-center mt-10 text-3xl font-semibold">
            <h2>Skripsi</h2>
        </div>
        <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
            <p className="text-center">Skripsi</p>
        </div>
        <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
            <div className="flex items-center">
            <div className="flex-col ml-8">
                <div className="flex w-full mt-10">
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
                </div>
                <div className="flex w-full -mt-10">
                <p className="flex items-center w-64 p-10 font-semibold">
                    Lama Studi
                </p>
                <div className="flex items-center ml-28">
                    <input
                    className="p-2 border border-gray-300 bg-white"
                    type="number"
                    id="semester"
                    name="semester"
                    placeholder="Semester"
                    />{" "}
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
                    Tanggal Sidang
                </p>
                <div className="flex items-center ml-28">
                    <input
                    className="p-2 border border-gray-300 bg-white"
                    type="date"
                    id="tgl_sidang"
                    name="tgl_sidang"
                    placeholder="Dalam bulan"
                    />{" "}
                </div>
                {state.errors?.tgl_sidang && (
                    <div
                    id="tgl_sidang-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                    >
                    {state.errors.tgl_sidang.map((error: string) => (
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
                    name="nilai_skripsi"
                    id="nilai_skripsi"
                    >
                    <option>Masukkan Nilai</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    </select>{" "}
                </div>
                {state.errors?.nilai_skripsi && (
                    <div
                    id="nilai_skripsi-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                    >
                    {state.errors.nilai_skripsi.map((error: string) => (
                        <p key={error}>{error}</p>
                    ))}
                    </div>
                )}
                </div>
                <div className="flex w-full -mt-10">
                <p className="flex items-center w-64 p-10 font-semibold">
                    Upload Berita Acara Skripsi
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
