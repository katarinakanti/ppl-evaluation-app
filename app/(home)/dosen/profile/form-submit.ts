"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DosenSchema, DosenState } from "@/data/dosen";

const UpdateDosen = DosenSchema.pick({
  alamat: true,
  email: true,
  kota_id: true,
  nidn: true,
  no_hp: true,
});
export async function updateDosen(prevState: DosenState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateDosen.safeParse({
    nidn: formData.get("nidn"),
    no_hp: formData.get("no_hp"),
    email: formData.get("email"),
    alamat: formData.get("alamat"),
    kota_id: formData.get("kota_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nidn, no_hp, email, alamat, kota_id } = validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nip = user?.user_metadata.no_induk;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("dosen")
      .update({
        nidn,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nip", nip);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/dosen/profile");
  redirect("/dosen/profile");
}
