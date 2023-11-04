"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mapStatusToNumber } from "@/utils/functions";
import { cookies } from "next/headers";

import { MahasiswaSchema } from "@/data/mahasiswa";
import { MahasiswaState } from "@/data/mahasiswa";

const UpdateMahasiswa = MahasiswaSchema.pick({
  jalur_masuk_id: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});
export async function updateMhs(prevState: MahasiswaState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateMahasiswa.safeParse({
    jalur_masuk_id: formData.get("jalur_masuk_id"),
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

  const { jalur_masuk_id, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nim = user?.user_metadata.no_induk;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("mahasiswa")
      .update({
        jalur_masuk_id,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nim", nim);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/profile");
  redirect("/profile");
}
