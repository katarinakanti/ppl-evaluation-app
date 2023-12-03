"use server";

import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function deleteMahasiswa(nim: string) {
  try {
    await supabase.auth.admin.listUsers().then((res) => {
      res.data.users.map((user) => {
        if (user.user_metadata?.no_induk === nim) {
          supabase.auth.admin.deleteUser(user.id);
        }
      });
    });

    await supabase.from("mahasiswa").delete().eq("nim", nim);
    revalidatePath("/operator/mhs");
    // redirect("/operator/mhs");
  } catch (error) {
    console.error("Failed to delete mahasiswa data: ", error);
    throw new Error("Failed to delete mahasiswa");
  }
}
