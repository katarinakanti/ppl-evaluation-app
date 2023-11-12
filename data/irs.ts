import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";
import { Mahasiswa } from "./mahasiswa";
import { transformIRSData } from "@/utils/functions";

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

export type IrsWithRelations =
  | (Irs & {
      mahasiswa: Mahasiswa;
    })
  | null;

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
    // .order("semester", { ascending: true });

    if (!irs.data) {
      throw new Error("irs not found");
    }
    return irs.data as Irs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchAllIrs(): Promise<Irs[]> {
  try {
    const irs = await supabase.from("irs").select(`*`);
    // .order("semester", { ascending: true });

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

    console.log("nim, semester", nim, semester);

    if (!irs.data) {
      throw new Error("irs not found");
    }
    return irs.data as Irs;
  } catch (error) {
    console.error("Failed to fetch irs data: ", error);
    throw new Error("Failed to fetch irs data");
  }
}

export async function fetchIrsByAngkatan(
  angkatan: string
): Promise<{ semester: number; average_sks: number }[]> {
  try {
    // Cek di supabase buat rpc-nya
    // https://supabase.com/dashboard/project/ysqlqkegzdalostasyxo/database/functions
    const irs = await supabase.rpc("get_irs_by_angkatan", {
      angkatan,
    });

    if (!irs.data) {
      throw new Error("IRS not found");
    }

    return irs.data;
  } catch (error) {
    console.log("Failed to fetch IRS data: ", error);
    console.error("Failed to fetch IRS data: ", error);
    throw new Error("Failed to fetch IRS data");
  }
}

type IrsByAngkatanBySmt = {
  nim: string;
  nama: string;
  status_mhs: string;
  angkatan: number;
  sks_diambil: number;
  status_verifikasi: string;
};
export async function fetchIrsByAngkatanBySmt(
  akt: number,
  smt: number
): Promise<IrsByAngkatanBySmt[]> {
  try {
    // Cek di supabase buat rpc-nya
    // https://supabase.com/dashboard/project/ysqlqkegzdalostasyxo/database/functions
    const irs = await supabase.rpc("get_irs_by_akt_smt", { akt, smt });

    if (!irs.data) {
      throw new Error("IRS not found");
    }

    return irs.data;
  } catch (error) {
    console.log("Failed to fetch IRS data: ", error);
    console.error("Failed to fetch IRS data: ", error);
    throw new Error("Failed to fetch IRS data");
  }
}
