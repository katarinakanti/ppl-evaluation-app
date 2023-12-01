"use client";

import { useFormState } from "react-dom";
import { updateSkripsi } from "./skripsi-submit";
import { getFileUrl } from "@/utils/functions";
import { SkripsiWithRelations } from "@/data/skripsi";
import { Button } from "@/components/Button";
import { Dosen } from "@/data/dosen";

export default function UpdateSkripsi({
    data,
    dosen,
}: {
    data: SkripsiWithRelations;
    dosen: Dosen[];
}) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateSkripsi, initialState);
    return (
    <>
        {/* <link rel="stylesheet" href="view.css" /> */}
        <div className="text-center mt-10 text-3xl font-semibold">
        <h2>Skripsi</h2>
        </div>
        <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16 ">
        <p className="text-center">Skripsi</p>
        </div>
        <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
        <div className="flex items-center">
            <div className="flex-col ml-8">
            {/* <div className="flex w-full mt-10">
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
            </div> */}
            <div className="flex w-full -mt-10">
                <p className="flex items-center w-60 p-10 font-semibold">
                Tanggal Sidang
                </p>
                <div className="flex items-center ml-28">
                <input
                    className="p-2 border border-gray-300 bg-white"
                    type="date"
                    id="tgl_sidang"
                    name="tgl_sidang"
                    placeholder="Dalam bulan"
                    defaultValue={data?.tgl_sidang.toString()}
                />
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
                <p className="flex items-center w-60 p-10 font-semibold">Nilai</p>
                <div className="flex items-center ml-28">
                <select
                    className="p-2 border border-gray-300 bg-white"
                    name="nilai_skripsi"
                    id="nilai_skripsi"
                    defaultValue={data?.nilai_skripsi}
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
                <p className="flex items-center w-60 p-10 font-semibold">
                Upload Berita Acara Skripsi
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
                    href={getFileUrl(data?.scan_skripsi!)}
                    target="_blank"
                    className="bg-blue-100 hover:bg-blue-200 p-2"
                    >
                    Lihat file lama: {data?.scan_skripsi}
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
