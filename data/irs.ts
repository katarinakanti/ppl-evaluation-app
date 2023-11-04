import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";

export const IrsSchema = z.object({
  nim: z.string(),
  semester: z.coerce
    .number({ invalid_type_error: "Tolong isi semester" })
    .min(1, "Semester harus antara 1-14")
    .max(14, "Semester harus antara 1-14"),
  scan_irs: z.string(),
  status_verifikasi_id: z.number().default(1),
  sks_diambil: z.coerce
    .number({ invalid_type_error: "Tolong isi sks" })
    .min(1, "SKS yang diambil harus antara 1-24")
    .max(24, "SKS yang diambil harus antara 1-24"),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Irs = z.infer<typeof IrsSchema>;

export type IrsState = {
  errors?: {
    nim?: string[];
    semester?: string[];
    scan_irs?: string[];
    status_verifikasi_id?: string[];
    sks_diambil?: string[];
    file?: string[];
    created_at?: string[];
    updated_at?: string[];
  };
  message?: string | null;
};

export async function fetchIrsByNim(nim: string): Promise<Irs[]> {
  try {
    const irs = await supabase
      .from("irs")
      .select(
        `
        *
      `
      )
      .eq("nim", nim);

    if (!irs.data) {
      throw new Error("irs not found");
    }
    return irs.data as Irs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchIrsByNimBySem(
  nim: string,
  semester: number
): Promise<Irs> {
  try {
    const irs = await supabase
      .from("irs")
      .select(
        `
        *
      `
      )
      .eq("nim", nim)
      .eq("semester", semester)
      .single();

    if (!irs.data) {
      throw new Error("irs not found");
    }
    return irs.data as Irs;
  } catch (error) {
    console.error("Failed to fetch irs data: ", error);
    throw new Error("Failed to fetch irs data");
  }
}
