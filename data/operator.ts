import { serverActionSupabase as supabase } from "@/lib/supabaseClient";
import { Mahasiswa } from "./mahasiswa";
import { Kota } from "./kota";
import { z } from "zod";

export const OperatorSchema = z.object({
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

export type OperatorState = {
  errors?: {
    nama?: string[];
    nip?: string[];
    nidn?: string[];
    alamat?: string[];
    email?: string[];
    no_hp?: string[];
    kota_id?: string[];
  };
  message?: string | null;
};

export type Operator = {
  nip: string;
  nama: string;
  alamat?: string;
  email?: string;
  no_hp?: string;
  foto_operator?: string;
  kota_id?: number; // foreign key on table kota.id
  created_at: string;
  updated_at: string;
};

export type OperatorWithRelations = Operator & {
  kota: Kota | null;
};

export type Dosen = {
  nip: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export async function fetchOperatorByNip(
  nip: string
): Promise<OperatorWithRelations> {
  try {
    const operator = await supabase
      .from("operator")
      .select("*, kota:kota_id (*)")
      .eq("nip", nip)
      .single();
    if (!operator.data) {
      throw new Error("operator not found");
    }
    return operator.data as OperatorWithRelations;
  } catch (error) {
    console.error("Failed to fetch operator data: ", error);
    throw new Error("Failed to fetch operator");
  }
}

export async function fetchAllMahasiswa(): Promise<Mahasiswa[]> {
  try {
    const mahasiswa = await supabase.from("mahasiswa").select(`*`);

    if (!mahasiswa.data || mahasiswa.data.length === 0) {
      throw new Error("No mahasiswa found");
    }

    return mahasiswa.data as Mahasiswa[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchAllDepartemen(): Promise<Operator[]> {
  try {
    const departemen = await supabase.from("departemen").select("*");
    return departemen.data as Operator[];
  } catch (error) {
    console.error("Failed to fetch departemen data: ", error);
    throw new Error("Failed to fetch departemen");
  }
}

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

export async function fetchMhsByAngkt(angkatan: number): Promise<Mahasiswa[]> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(
        `
    *
`
      )
      .eq("angkatan", angkatan);
    if (!mahasiswa.data) {
      throw new Error("khs not found");
    }
    return mahasiswa.data as Mahasiswa[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa data");
  }
}

export async function fetchMhsByNip(nip: string): Promise<Mahasiswa[]> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(
        `
        *
    `
      )
      .eq("doswal_nip", nip);
    if (!mahasiswa.data) {
      throw new Error("mahasiswa not found");
    }
    return mahasiswa.data as Mahasiswa[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}

export async function fetchMahasiswaByNim(
  nim: string,
  angkatan: number
): Promise<Mahasiswa[]> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(`*`)
      .eq("nim", nim)
      .eq("angkatan", angkatan);
    if (!mahasiswa.data || mahasiswa.data.length === 0) {
      throw new Error("mahasiswa not found");
    }
    return mahasiswa.data as Mahasiswa[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}
