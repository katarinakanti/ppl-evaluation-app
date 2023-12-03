import {
  serverActionAdminSupabase,
  serverActionSupabase as supabase,
} from "@/lib/supabaseClient";
import { z } from "zod";

import { JalurMasuk } from "./jalur_masuk";
import { Dosen } from "./dosen";
import { StatusMhs } from "./status_mhs";
import { Kota } from "./kota";

export const MahasiswaSchema = z.object({
  nama: z.string({
    invalid_type_error: "Isi namanya yang sesuai ya.",
  }),
  nim: z.string({
    invalid_type_error: "Isi nomor induknya yang sesuai ya.",
  }),
  angkatan: z.coerce
    .number()
    .gt(2004, { message: "Isi angkatannya yang bener yaa" }),
  doswal_nip: z.string({
    invalid_type_error: "Isi nipnya yang sesuai ya.",
  }),
  status: z.enum(
    [
      "Aktif",
      "Cuti",
      "Lulus",
      "Mangkir",
      "Drop Out",
      "Undur Diri",
      "Meninggal Dunia",
    ],
    {
      invalid_type_error: "Isi statusnya yang sesuai ya.",
    }
  ),
  alamat: z.string().optional(),
  jalur_masuk_id: z.coerce.number().optional(),
  email: z.string().optional(),
  no_hp: z.string().optional(),
  kota_id: z.coerce.number().optional(),
});

export type MahasiswaState = {
  errors?: {
    nama?: string[];
    nim?: string[];
    angkatan?: string[];
    doswal_nip?: string[];
    status?: string[];
    alamat?: string[];
    jalur_masuk_id?: string[];
    email?: string[];
    no_hp?: string[];
    kota_id?: string[];
  };
  message?: string | null;
};

export type Mahasiswa = {
  nim: string;
  nama: string;
  angkatan: number;
  status_mhs_id: number;
  alamat?: string;
  jalur_masuk_id?: number; // foreign key on table jalur_masuk.id
  email?: string;
  no_hp?: string;
  foto_mhs?: string;
  doswal_nip?: string; // foreign key on table dosen.nip
  kota_id?: number; // foreign key on table kota.id
  created_at: string;
  updated_at: string;
};

export type MahasiswaWithRelations = Mahasiswa & {
  dosen: Dosen;
  status: StatusMhs;
  jalur_masuk: JalurMasuk | null;
  kota: Kota | null;
};

export async function fetchAllMahasiswa(): Promise<MahasiswaWithRelations[]> {
  try {
    const mahasiswa = await supabase.from("mahasiswa").select(
      `
      *,
      jalur_masuk:jalur_masuk_id (*),
      dosen:doswal_nip (*),
      status:status_mhs_id (*),
      kota:kota_id (*)
    `
    );
    return mahasiswa.data as MahasiswaWithRelations[];
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchMahasiswaByNim(
  nim: string
): Promise<MahasiswaWithRelations> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(
        `
        *,
        jalur_masuk:jalur_masuk_id (*),
        dosen:doswal_nip (*),
        status:status_mhs_id (*),
        kota:kota_id (*)
      `
      )
      .eq("nim", nim)
      .single();

    if (!mahasiswa.data) {
      throw new Error("Mahasiswa not found");
    }
    return mahasiswa.data as MahasiswaWithRelations;
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchMahasiswaByAngkatan(
  angkatan: number,
  search?: string
): Promise<MahasiswaWithRelations[]> {
  try {
    let query = supabase
      .from("mahasiswa")
      .select(
        `
        *,
        jalur_masuk:jalur_masuk_id (*),
        dosen:doswal_nip (*),
        status:status_mhs_id (*),
        kota:kota_id (*)
      `
      )
      .eq("angkatan", angkatan);

    if (search) {
      query = query.or(`nama.ilike.%${search}%,nim.ilike.%${search}%`);
    }

    const mahasiswa = await query;

    // buat noia: ini yang kode kamu aku comment soalnya jadi gajalan di aku
    // const { data: mahasiswa } = await query;
    return mahasiswa.data as MahasiswaWithRelations[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}
