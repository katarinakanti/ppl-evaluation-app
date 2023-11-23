import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";
import { Dosen } from "./dosen";

export const SkripsiSchema = z.object({
  nim: z.string(),
  dosen_pembimbing_nip: z.coerce.string({
    invalid_type_error: "Tolong pilih Dosen Pembimbing",
  }),
  angkatan: z.coerce.number(),
  tgl_sidang: z.coerce.date({
    invalid_type_error: "Tolong isi Tanggal Sidang Skripsi",
  }),

  status_verifikasi_id: z.number().default(1),

  status_mhs_id: z.coerce.number(),

  nilai_skripsi: z.coerce.string({
    invalid_type_error: "Tolong isi Nilai Skripsi",
  }),
  semester: z.coerce.number(),
  scan_skripsi: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Skripsi = z.infer<typeof SkripsiSchema>;
export type SkripsiWithRelations =
  | (Skripsi & {
      dosen: Dosen;
    })
  | null;

export type SkripsiState = {
  errors?: {
    nim?: string[];
    dosen_pembimbing_nip?: string[];
    tgl_sidang?: string[];
    semester?: string[];
    status_verifikasi_id?: string[];
    nilai_skripsi?: string[];
    file?: string[];
    scan_skripsi?: string[];
    created_at?: string[];
    updated_at?: string[];
  };
  message?: string | null;
};

export async function fetchSkripsiByNim(
  nim: string
): Promise<SkripsiWithRelations> {
  try {
    const skripsi = await supabase
      .from("skripsi")
      .select("*, dosen:dosen_pembimbing_nip (*)")
      .eq("nim", nim)
      .single();

    if (!skripsi.data) {
      return null;
    }
    return skripsi.data as SkripsiWithRelations;
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

type PklByAngkatanReturnType = {
  nim: string;
  nama: string;
  angkatan: number;
  nilai_skripsi: string | null;
};
export async function fetchSkripsiByAngkatanOnProgress(
  angkatan: number,
  status: boolean
): Promise<PklByAngkatanReturnType[]> {
  const { data, error } = await supabase.rpc("get_mahasiswa_skripsi", {
    p_angkatan: angkatan,
    p_is_exist: status,
  });

  return data;
}
