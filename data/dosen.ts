import { serverActionSupabase } from "@/lib/supabaseClient";

export type Dosen = {
  nip: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export async function fetchAllDosen(): Promise<Dosen[]> {
  try {
    const dosen = await serverActionSupabase.from("dosen").select("*");
    return dosen.data as Dosen[];
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}

export async function fetchDosenByNip(nip: string): Promise<Dosen> {
  try {
    const dosen = await serverActionSupabase
      .from("dosen")
      .select("*")
      .eq("nip", nip);
    if (!dosen.data) {
      throw new Error("Dosen not found");
    }
    return dosen.data[0] as Dosen;
  } catch (error) {
    console.error("Failed to fetch dosen data: ", error);
    throw new Error("Failed to fetch dosen");
  }
}
