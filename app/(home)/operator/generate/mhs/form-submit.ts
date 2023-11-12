"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MahasiswaSchema } from "@/data/mahasiswa";
import { MahasiswaState } from "@/data/mahasiswa";

const CreateMahasiswa = MahasiswaSchema.pick({
  nama: true,
  nim: true,
  angkatan: true,
  doswal_nip: true,
});

export async function generateMhs(
  prevState: MahasiswaState,
  formData: FormData
) {
  // 1. Validate the form data
  const validatedFields = CreateMahasiswa.safeParse({
    nama: formData.get("nama"),
    nim: formData.get("nim"),
    angkatan: formData.get("angkatan"),
    doswal_nip: formData.get("doswal_nip"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nama, nim, angkatan, doswal_nip } = validatedFields.data;

  // 2. Create dummy email that is nim@maildrop.cc
  const email = `${nim}@maildrop.cc`;

  try {
    // 3. Create account using admin api
    await supabase.auth.admin.createUser({
      email: email,
      password: nim,
      email_confirm: true,
      user_metadata: {
        nama,
        no_induk: nim,
        role: "mahasiswa",
      },
    });

    // 4. create also the user on the correlated table (mahasiswa, dosen)
    const { data, error } = await supabase.from("mahasiswa").insert([
      {
        nim: nim,
        nama,
        angkatan,
        status_mhs_id: 1,
        doswal_nip,
      },
    ]);
    console.log("User created successfully");
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/operator/generate/mhs");
  redirect("/operator/generate/mhs");
}
