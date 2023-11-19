import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Irs } from "./irs";
import { Khs } from "./khs";
import { PklWithRelations } from "./pkl";
import { SkripsiWithRelations } from "./skripsi";

// Define a type for the return value
type StudentProgress = {
  irs: Irs[] | null;
  khs: Khs[] | null;
  pkl: PklWithRelations | null;
  skripsi: SkripsiWithRelations | null;
};

export const progressMahasiswa = async (
  nim: string
): Promise<StudentProgress> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch multiple records
  const fetchMultiple = async <T>(table: string): Promise<T[] | null> => {
    const { data } = await supabase.from(table).select("*").eq("nim", nim);
    return data;
  };

  const { data: pklData } = await supabase
    .from("pkl")
    .select("*, dosen:dosen_pembimbing_nip (*)")
    .eq("nim", nim)
    .single();

  const { data: skripsiData } = await supabase
    .from("skripsi")
    .select("*, dosen:dosen_pembimbing_nip (*)")
    .eq("nim", nim)
    .single();

  const irs = await fetchMultiple<Irs>("irs");
  const khs = await fetchMultiple<Khs>("khs");
  const pkl = pklData as PklWithRelations;
  const skripsi = skripsiData as SkripsiWithRelations;

  return { irs, khs, pkl, skripsi };
};
