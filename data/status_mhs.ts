import { serverActionSupabase as supabase } from "@/lib/supabaseClient";


export type StatusMhs = {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
};

export async function fetchStatusMahasiswa(): Promise<StatusMhs[]> {
  try {
    const status_mhs = await supabase.from("status_mhs").select(`*`);

    if (!status_mhs.data || status_mhs.data.length === 0) {
      throw new Error("No status_mhs found");
    }

    return status_mhs.data as StatusMhs[];
  } catch (error) {
    console.error("Failed to fetch status_mhs data: ", error);
    throw new Error("Failed to fetch status_mhs");
  }
}