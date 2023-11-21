import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";
import { Dosen } from "./dosen";
import { Mhs } from "./dosen";
import { Mahasiswa } from "./mahasiswa";

export const PklSchema = z.object({
  nim: z.string(),

  dosen_pembimbing_nip: z.coerce.string({
    invalid_type_error: "Tolong pilih Dosen Pembimbing",
  }),
  angkatan: z.coerce.number(),
  waktu_pkl: z.coerce.date({ invalid_type_error: "Tolong isi Waktu PKL" }),

  status_verifikasi_id: z.number().default(1),

  status_mhs_id: z.coerce.number(),

  nilai_pkl: z.coerce.string({ invalid_type_error: "Tolong isi Nilai PKL" }),
  semester: z.coerce.number(),
  scan_pkl: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Pkl = z.infer<typeof PklSchema>;
export type PklWithRelations =
  | (Pkl & {
      dosen: Dosen;
      mahasiswa: Mahasiswa;
    })
  | null;

export type PklState = {
  errors?: {
    nim?: string[];
    dosen_pembimbing_nip?: string[];
    waktu_pkl?: string[];
    semester?: string[];
    status_verifikasi_id?: string[];
    nilai_pkl?: string[];
    file?: string[];
    scan_pkl?: string[];
    created_at?: string[];
    updated_at?: string[];
    nama?: string;
  };
  message?: string | null;
};

export async function fetchPklByNim(nim: string): Promise<PklWithRelations> {
  try {
    const pkl = await supabase
      .from("pkl")
      .select("*, dosen:dosen_pembimbing_nip (*)")
      .eq("nim", nim)
      .single();

    if (!pkl.data) {
      return null;
    }

    return pkl.data as PklWithRelations;
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}
export async function fetchPklByNim1(nim: string): Promise<Pkl[]> {
  try {
    const pkl = await supabase
      .from("pkl")
      .select(
        `
        *
      `
      )
      .eq("nim", nim);

    if (!pkl.data) {
      throw new Error("Pkl not found");
    }
    return pkl.data as Pkl[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchPklByNimAngkatanDosen(
  nim: string[],
  angkatan: string,
  dosenPembimbing: string
): Promise<PklWithRelations> {
  try {
    const pkl = await supabase
      .from("pkl")
      .select("*, dosen:dosen_pembimbing_nip (*), mhs:nim(*)")
      .eq("nim", nim)
      .eq("angkatan", angkatan)
      .eq("dosen_pembimbing_nip", dosenPembimbing)
      .single();

    if (!pkl.data) {
      return null;
    }
    return pkl.data as PklWithRelations;
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw new Error("Failed to fetch data");
  }
}

type PklByAngkatan = {
  nim: string;
  nama: string;
  angkatan: number;
  nilai_pkl: string;
};
// export async function fetchPklByAngkatan(
//   angkatan: number,
// ): Promise<Pkl[]> {
//   try {
//     // Cek di supabase buat rpc-nya
//     // https://supabase.com/dashboard/project/ysqlqkegzdalostasyxo/database/functions
//     const pkl = await supabase.rpc("get_pkl_by_angkatan", { angkatan });

//     if (!pkl.data) {
//       throw new Error("pkl not found");
//     }

//     return pkl.data;
//   } catch (error) {
//     console.log("Failed to fetch pkl data: ", error);
//     console.error("Failed to fetch pkl data: ", error);
//     throw new Error("Failed to fetch pkl data");
//   }
// }

export async function fetchPklByAngkatan(
  angkatan: number
  // status: number
): Promise<PklWithRelations[]> {
  try {
    const pkl = await supabase
      .from("pkl")
      .select(
        `
          *,  mahasiswa:nim (*), dosen:dosen_pembimbing_nip (*)
        `
      )
      .eq("angkatan", angkatan);
    // .eq("status_verifikasi_id", status);

    if (!pkl.data) {
      throw new Error("Pkl not found");
    }
    return pkl.data as PklWithRelations[];
  } catch (error) {
    console.log("error", error);
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

// export async function fetchPklByAngkatan(
//   akt: number,
// ): Promise<PklByAngkatan[]> {
//   try {
//     // Cek di supabase buat rpc-nya
//     // https://supabase.com/dashboard/project/ysqlqkegzdalostasyxo/database/functions
//     const pkl = await supabase.rpc("get_pkl_by_akt", { akt});

//     if (!pkl.data) {
//       throw new Error("pkl not found");
//     }

//     return pkl.data;
//   } catch (error) {
//     console.log("Failed to fetch pkl data: ", error);
//     console.error("Failed to fetch pkl data: ", error);
//     throw new Error("Failed to fetch pkl data");
//   }
// }
