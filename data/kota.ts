import { serverActionSupabase } from "@/lib/supabaseClient";

export type Kota = {
  id: number;
  nama: string;
  provinsi_id: number;
  created_at: string;
};

export async function fetchKotaByProvinsiId(
  provinsi_id: number
): Promise<Kota[]> {
  try {
    const kota = await serverActionSupabase
      .from("kota")
      .select("*")
      .eq("provinsi_id", provinsi_id);
    if (!kota.data) {
      throw new Error("Kota not found");
    }
    return kota.data as Kota[];
  } catch (error) {
    console.error("Failed to fetch kota data: ", error);
    throw new Error("Failed to fetch kota");
  }
}
