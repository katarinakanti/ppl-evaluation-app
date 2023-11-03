import { serverActionSupabase } from "@/lib/supabaseClient";

export type Provinsi = {
  id: number;
  nama: string;
  created_at: string;
};

export async function fetchAllProvinsi(): Promise<Provinsi[]> {
  try {
    const provinsi = await serverActionSupabase.from("provinsi").select("*");
    return provinsi.data as Provinsi[];
  } catch (error) {
    console.error("Failed to fetch provinsi data: ", error);
    throw new Error("Failed to fetch provinsi");
  }
}

export async function fetchProvinsiById(id: string): Promise<Provinsi> {
  try {
    const provinsi = await serverActionSupabase
      .from("provinsi")
      .select("*")
      .eq("id", id)
      .single();
    if (!provinsi.data) {
      throw new Error("Provinsi not found");
    }
    return provinsi.data as Provinsi;
  } catch (error) {
    console.error("Failed to fetch provinsi data: ", error);
    throw new Error("Failed to fetch provinsi");
  }
}
