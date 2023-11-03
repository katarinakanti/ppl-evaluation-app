import { serverActionSupabase } from "@/lib/supabaseClient";

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
  kota_id?: string; // foreign key on table kota.id
  created_at: string;
  updated_at: string;
};

export async function fetchAllDosen(): Promise<Mahasiswa[]> {
  try {
    const mahasiswa = await serverActionSupabase.from("mahasiswa").select("*");
    return mahasiswa.data as Mahasiswa[];
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchMahasiswaByNim(nim: string): Promise<Mahasiswa> {
  try {
    const mahasiswa = await serverActionSupabase
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
    console.log(mahasiswa.data);
    return mahasiswa.data as Mahasiswa;
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
  }
}
