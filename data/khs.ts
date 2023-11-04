import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";

export const KhsSchema = z.object({
  nim: z.string(),
  semester: z.coerce
    .number({ invalid_type_error: "Tolong isi semester" })
    .min(1, "Semester harus antara 1-14")
    .max(14, "Semester harus antara 1-14"),
  scan_khs: z.string(),
  status_verifikasi_id: z.number().default(1),
  sks_semester: z.coerce
    .number({ invalid_type_error: "Tolong isi SKS semester" })
    .min(1, "SKS yang diambil harus antara 1-24")
    .max(24, "SKS yang diambil harus antara 1-24"),
  ip_semester: z.coerce
    .number({ invalid_type_error: "Tolong isi Indeks Prestasi semester" })
    .min(0.0, "Indeks prestasi semester tsb harus antara 0.0-4.0")
    .max(4.0, "Indeks prestasi semester tsb harus antara 0.0-4.0"),
  sks_kumulatif: z.coerce
    .number({ invalid_type_error: "Tolong isi SKS kumulatif" })
    .min(0, "SKS yang diambil harus antara 1-144")
    .max(144, "SKS yang diambil harus antara 1-144"),
  ip_kumulatif: z.coerce
    .number({ invalid_type_error: "Tolong isi Indeks Prestas kumulatif" })
    .min(0.0, "Indeks prestasi semester tsb harus antara 0.0-4.0")
    .max(4.0, "Indeks prestasi semester tsb harus antara 0.0-4.0"),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Khs = z.infer<typeof KhsSchema>;

export type KhsState = {
  errors?: {
    nim?: string[];
    semester?: string[];
    scan_irs?: string[];
    status_verifikasi_id?: string[];
    sks_semester?: string[];
    ip_semester?: string[];
    sks_kumulatif?: string[];
    ip_kumulatif?: string[];
    file?: string[];
    created_at?: string[];
    updated_at?: string[];
  };
  message?: string | null;
};

export async function fetchKhsByNim(nim: string): Promise<Khs[]> {
  try {
    const khs = await supabase
      .from("khs")
      .select(
        `
        *
      `
      )
      .eq("nim", nim);

    if (!khs.data) {
      throw new Error("KHS not found");
    }
    return khs.data as Khs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchKhsByNimBySem(
  nim: string,
  semester: number
): Promise<Khs> {
  try {
    const khs = await supabase
      .from("khs")
      .select(
        `
        *
      `
      )
      .eq("nim", nim)
      .eq("semester", semester)
      .single();

    if (!khs.data) {
      throw new Error("KHS not found");
    }
    return khs.data as Khs;
  } catch (error) {
    console.error("Failed to fetch irs data: ", error);
    throw new Error("Failed to fetch irs data");
  }
}
