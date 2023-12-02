"use client";

import { MahasiswaWithRelations } from "@/data/mahasiswa";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "Aktif":
      return "bg-green-500 text-white";
    case "Cuti":
      return "bg-yellow-500";
    case "Lulus":
      return "bg-blue-500 text-white";
    case "Mangkir":
      return "bg-purple-500 text-white";
    case "Drop Out":
      return "bg-red-500 text-white";
    case "Undur Diri":
      return "bg-pink-500 text-white";
    case "Meninggal Dunia":
      return "bg-black text-white";
    default:
      return "bg-gray-500"; // or any default color
  }
}

export const columns: ColumnDef<MahasiswaWithRelations>[] = [
  {
    accessorKey: "nim",
    header: "NIM",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "angkatan",
    header: "Angkatan",
  },
  {
    accessorKey: "dosen.nama",
    header: "Dosen",
  },
  {
    accessorKey: "status.nama",
    header: "Status",
    cell: ({ getValue }) => {
      // create a badge for each status that are:
      // Aktif: green, Cuti: yellow, Lulus: blue, Mangkir: purple,
      // Drop Out: red, Undur Diri: brown, Meninggal Dunia: black-white

      return (
        <div
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusBadgeColor(
            getValue() as string
          )}`}
        >
          {getValue() as string}
        </div>
      );
    },
  },
];
