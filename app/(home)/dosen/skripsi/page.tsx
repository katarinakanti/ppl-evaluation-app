import Link from "next/link";

export default function Page() {
return (
<div>
    <br />
    <br />
    <h1 className="text-center text-4xl font-bold font-arial">
    Skripsi
    </h1>
    <br />
    <br />
    <div className="flex items-center justify-center mx-auto bg-gray-100 border border-gray-500 w-10/12 h-16">
    <p className="text-center">Skripsi</p>
    </div>

    <div className="mx-auto bg-gray-100 w-10/12 h-fit">
    <div className="flex items-center justify-center pt-10">

        <div className="flex-col flex w-11/12">
        <div className="flex w-full mb-8">
            <div className="text-2xl font-bold flex items-center justify-center bg-gray-300 w-14 h-20 p-4">
            1
            </div>
            <div className="flex items-center bg-gray-200 w-full h-20 p-4">
            <div>
                <Link href="/dosen/skripsi/1">
                <p className="text-lg mb-1 font-sans font-semibold text-left">
                    Angkatan 2019
                </p>
                <p className="text-sm font-sans font-extralight">
                    Jumlah Mahasiswa : 170 | Mahasiswa Anda : 70 | Sudah Skripsi : 2
                </p>
                </Link>
            </div>
            </div>
        </div>

        <div className="flex w-full mb-8">
            <div className=" text-2xl font-bold flex items-center justify-center bg-gray-300 w-14 h-20 p-4">
            2
            </div>
            <div className="flex items-center bg-gray-200 w-full h-20 p-4">
            <div>
                <Link href="/dosen/skripsi/2">
                <p className="text-lg mb-1 font-sans font-semibold text-left">
                    Angkatan 2020
                </p>
                <p className="text-sm font-sans font-extralight">
                    Jumlah Mahasiswa : 168 | Mahasiswa Anda : 70 | Sudah Skripsi : 2
                </p>
                </Link>
            </div>
            </div>
        </div>

        <div className="flex w-full">
            <div className="text-2xl font-bold flex items-center justify-center bg-gray-300 w-14 h-20 p-4">
            3
            </div>
            <div className="flex items-center bg-gray-200 w-full h-20 p-4">
            <div>
                <button>
                <p className="text-lg mb-1 font-sans font-semibold text-left">
                    Angkatan 2021
                </p>
                <p className="text-sm font-sans font-extralight">
                    Jumlah Mahasiswa : 170 | Mahasiswa Anda : 70 | Sudah Skripsi : 2
                </p>
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
);
}
