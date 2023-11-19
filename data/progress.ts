import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Irs } from "./irs";
import { Khs } from "./khs";
import { Pkl } from "./pkl";
import { Skripsi } from "./skripsi";

// Define a type for the return value
type StudentProgress = {
  irs: Irs[] | null;
  khs: Khs[] | null;
  pkl: Pkl | null;
  skripsi: Skripsi | null;
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

  // Fetch single record
  const fetchSingle = async <T>(table: string): Promise<T | null> => {
    const { data } = await supabase
      .from(table)
      .select("*")
      .eq("nim", nim)
      .single();
    return data;
  };

  const irs = await fetchMultiple<Irs>("irs");
  const khs = await fetchMultiple<Khs>("khs");
  const pkl = await fetchSingle<Pkl>("pkl");
  const skripsi = await fetchSingle<Skripsi>("skripsi");

  return { irs, khs, pkl, skripsi };
};
