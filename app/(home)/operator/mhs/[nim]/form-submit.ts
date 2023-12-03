"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";

import { MahasiswaSchema } from "@/data/mahasiswa";
import { MahasiswaState } from "@/data/mahasiswa";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UpdateMahasiswa = MahasiswaSchema.pick({
  nama: true,
  nim: true,
  angkatan: true,
  jalur_masuk_id: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});
export async function updateMhs(prevState: MahasiswaState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateMahasiswa.safeParse({
    nama: formData.get("nama"),
    nim: formData.get("nim"),
    angkatan: formData.get("angkatan"),
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

  const { nama, nim, angkatan, jalur_masuk_id, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  try {
    await supabase.auth.admin.listUsers().then((res) => {
      res.data.users.map((user) => {
        if (user.user_metadata?.no_induk === nim) {
          supabase.auth.admin.updateUserById(user.id, {
            email,
            user_metadata: {
              nama,
            },
          });
        }
      });
    });

    await supabase
      .from("mahasiswa")
      .update({
        nama,
        angkatan,
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

  revalidatePath("/operator/mhs");
  redirect("/operator/mhs");
}
