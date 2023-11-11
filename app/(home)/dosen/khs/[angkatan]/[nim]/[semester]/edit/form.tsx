"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateKhs } from "./khs-submit";
import { Khs } from "@/data/khs";
import { getFileUrl } from "@/utils/functions";
import { Button } from "@/components/Button";

export default function UpdateIrs({
data,
params,
}: {
data: Khs;
params: { angkatan: string; nim: string; semester: string };
}) {
const initialState = { message: null, errors: {} };
const [state, dispatch] = useFormState(updateKhs, initialState);
const { pending } = useFormStatus();

return (
<>
    {/* <link rel="stylesheet" href="view.css" /> */}
    <div className="text-center mt-10 text-3xl font-semibold">
    <h2>Kartu Hasil Studi (KHS)</h2>
    </div>
    <div className="mt-10 flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">KHS</p>
    </div>
    <form action={dispatch} className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex items-center">
        <div className="flex-col ml-8">
        <input
            className="w-80 p-2 border border-gray-300 bg-white"
            type="number"
            name="angkatan"
            id="angkatan"
            placeholder="1 - 14"
            defaultValue={params.angkatan}
            readOnly
            hidden
        />
        <input
            className="w-80 p-2 border border-gray-300 bg-white"
            type="number"
            name="nim"
            id="nim"
            placeholder="1 - 14"
            defaultValue={params.nim}
            readOnly
            hidden
        />
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
                hidden
            />
            <p>{data.semester}</p>
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
            IP Semester
            </p>
            <div className="flex items-center ml-28">
            <input
                className="w-80 p-2 border border-gray-300 bg-white"
                type="number"
                name="ip_semester"
                id="ip_semester"
                placeholder="0 - 24"
                defaultValue={data.ip_semester}
            />
                      {" "}
            </div>
            {state.errors?.ip_semester && (
            <div
                id="ip-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
            >
                {state.errors.ip_semester.map((error: string) => (
                <p key={error}>{error}</p>
                ))}
            </div>
            )}
        </div>

        <div className="flex w-full -mt-10">
            <p className="flex items-center w-60 p-10 font-semibold">
            SKS Semester
            </p>
            <div className="flex items-center ml-28">
            <input
                className="w-80 p-2 border border-gray-300 bg-white"
                type="number"
                name="sks_semester"
                id="sks_semester"
                placeholder="0 - 24"
                defaultValue={data.sks_semester}
            />
                      {" "}
            </div>
            {state.errors?.sks_semester && (
            <div
                id="sks-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
            >
                {state.errors.sks_semester.map((error: string) => (
                <p key={error}>{error}</p>
                ))}
            </div>
            )}
        </div>
        
        <div className="flex w-full -mt-10">
            <p className="flex items-center w-60 p-10 font-semibold">
            IP Kumulatif
            </p>
            <div className="flex items-center ml-28">
            <input
                className="w-80 p-2 border border-gray-300 bg-white"
                type="number"
                name="ip_kumulatif"
                id="ip_kumulatif"
                placeholder="0 - 24"
                defaultValue={data.ip_kumulatif}
            />
                      {" "}
            </div>
            {state.errors?.ip_kumulatif && (
            <div
                id="ip-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
            >
                {state.errors.ip_kumulatif.map((error: string) => (
                <p key={error}>{error}</p>
                ))}
            </div>
            )}
        </div>
        
        <div className="flex w-full -mt-10">
            <p className="flex items-center w-60 p-10 font-semibold">
            SKS Kumulatif
            </p>
            <div className="flex items-center ml-28">
            <input
                className="w-80 p-2 border border-gray-300 bg-white"
                type="number"
                name="sks_kumulatif"
                id="sks_kumulatif"
                placeholder="0 - 24"
                defaultValue={data.sks_kumulatif}
            />
                      {" "}
            </div>
            {state.errors?.sks_kumulatif && (
            <div
                id="sks-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
            >
                {state.errors.sks_kumulatif.map((error: string) => (
                <p key={error}>{error}</p>
                ))}
            </div>
            )}
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
            <div>
                <a
                href={getFileUrl(data.scan_khs)}
                target="_blank"
                className="bg-blue-100 hover:bg-blue-200 p-2"
                >
                Lihat file lama: {data.scan_khs}
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
