"use client";

import { MahasiswaWithRelations } from "@/data/mahasiswa";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteMahasiswa } from "@/data/admin";
import { ToastTrigger } from "@/components/ui/toast-button";

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

async function deleteHandler(nim: string) {
  await deleteMahasiswa(nim);
}

export const columns: ColumnDef<MahasiswaWithRelations>[] = [
  {
    accessorKey: "nim",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Angkatan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dosen.nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dosen Wali
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status.nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
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
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/operator/mhs/${data.nim}`}>
              <DropdownMenuItem className="cursor-pointer">
                Update
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <ToastTrigger
                onTrigger={() => deleteHandler(data.nim)}
                message={{
                  title: "Berhasil menghapus mahasiswa",
                  description: "Mahasiswa berhasil dihapus dari database",
                }}
              >
                Delete
              </ToastTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
