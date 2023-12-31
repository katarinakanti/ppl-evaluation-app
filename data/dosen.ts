import { serverActionSupabase as supabase } from "@/lib/supabaseClient";
import { z } from "zod";
import { Kota } from "./kota";

export const DosenSchema = z.object({
  nama: z.string({
    invalid_type_error: "Isi namanya yang sesuai ya.",
  }),
  nip: z.string({
    invalid_type_error: "Isi nipnya yang sesuai ya.",
  }),
  nidn: z.string({
    invalid_type_error: "Isi nidnnya yang sesuai ya.",
  }),
  alamat: z.string().optional(),
  email: z.string().optional(),
  no_hp: z.string().optional(),
  kota_id: z.coerce.number().optional(),
});

export type DosenState = {
  errors?: {
    nama?: string[];
    no_hp?: string[];
    nip?: string[];
    nidn?: string[];
    alamat?: string[];
    email?: string[];
    kota_id?: string[];
  };
  message?: string | null;
};

export type Dosen = {
  nip: string;
  nama: string;
  alamat?: string;
  email?: string;
  no_hp?: string;
  foto_dosen?: string;
  kota_id?: number; // foreign key on table kota.id
  nidn?: string;
  created_at: string;
  updated_at: string;
};

export type DosenWithRelations = Dosen & {
  kota: Kota | null;
};

export type Mhs = {
  nim: string;
  angkatan: string;
  doswal_nip: string;
  nama: string;
};

export async function fetchAllDosen(): Promise<Dosen[]> {
  try {
    const dosen = await supabase.from("dosen").select("*");
    return dosen.data as Dosen[];
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchDosenByNip(nip: string): Promise<Dosen> {
  try {
    const dosen = await supabase
      .from("dosen")
      .select("*")
      .eq("nip", nip)
      .single();
    if (!dosen.data) {
      throw new Error("Dosen not found");
    }
    return dosen.data as Dosen;
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchDosenWithRelationsByNip(
  nip: string
): Promise<DosenWithRelations> {
  try {
    const dosen = await supabase
      .from("dosen")
      .select("*, kota:kota_id (*)")
      .eq("nip", nip)
      .single();
    if (!dosen.data) {
      throw new Error("Dosen not found");
    }
    return dosen.data as DosenWithRelations;
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchMhsByNip(nip: string, searchTerm?: string): Promise<Mhs[]> {
  try {
    let query = supabase
      .from("mahasiswa")
      .select(
        `
        *
      `
      )
      .eq("doswal_nip", nip);
    
    if (searchTerm) {
      query = query.or(`nama.ilike.%${searchTerm}%,nim.ilike.%${searchTerm}%`);
    }

    const mahasiswa = await query;

    if (!mahasiswa.data) {
      throw new Error("mahasiswa not found");
    }
    return mahasiswa.data as Mhs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchMhsByNipTunggal(nip: string): Promise<Mhs> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(
        `
        *
      `
      )
      .eq("doswal_nip", nip)
      .single();
    if (!mahasiswa.data) {
      throw new Error("mahasiswa not found");
    }
    return mahasiswa.data as Mhs;
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchMhsByNipByAngkt(
  nip: string,
  angkatan: number,
  searchTerm?: string
): Promise<Mhs[]> {
  try {
    let query = supabase
      .from("mahasiswa")
      .select("*")
      .eq("doswal_nip", nip)
      .eq("angkatan", angkatan);

    if (searchTerm) {
      query = query.or(`nama.ilike.%${searchTerm}%,nim.ilike.%${searchTerm}%`);
    }

    const mahasiswa = await query;

    if (!mahasiswa.data) {
      throw new Error("irs not found");
    }
    return mahasiswa.data as Mhs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa data");
  }
}

export async function handleApprovalClick(nim: string) {
  const { data, error } = await supabase
    .from("mahasiswa")
    .update({ status_verifikasi_id: 2 })
    .eq("nim", nim);
  if (error) {
    console.error("Gagal mengubah status verifikasi:", error);
  } else {
    console.log("Status verifikasi berhasil diubah");
  }
}
