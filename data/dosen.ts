import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

export type Dosen = {
  nip: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export type Mhs = {
  nim: string[];
  angkatan : string [];
  doswal_nip : string [];
  nama : string[]
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

export async function fetchMhsByNip(nip: string): Promise<Mhs[]> {
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
  angkatan: number
): Promise<Mhs[]> {
  try {
    const mahasiswa = await supabase
      .from("mahasiswa")
      .select(
        `
        *
      `
      )
      .eq("doswal_nip", nip)
      .eq("angkatan", angkatan)
    if (!mahasiswa.data) {
      throw new Error("irs not found");
    }
    return mahasiswa.data as Mhs[];
  } catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa data");
  }
}

export async function handleApprovalClick(nim : string) {
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




