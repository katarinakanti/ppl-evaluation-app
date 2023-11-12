"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DosenState } from "@/data/dosen";
import { DosenSchema } from "@/data/dosen";

const CreateMahasiswa = DosenSchema.pick({
  nama: true,
  nip: true,
});

export async function generateMhs(prevState: DosenState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = CreateMahasiswa.safeParse({
    nama: formData.get("nama"),
    nip: formData.get("nip"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nama, nip } = validatedFields.data;

  // 2. Create dummy email that is nim@maildrop.cc
  const email = `${nip}@maildrop.cc`;

  try {
    // 3. Create account using admin api
    await supabase.auth.admin.createUser({
      email: email,
      password: nip,
      email_confirm: true,
      user_metadata: {
        nama,
        no_induk: nip,
        role: "dosen",
      },
    });

    const { data, error } = await supabase.from("dosen").insert([
      {
        nama,
        nip,
      },
    ]);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/operator/generate/dosen");
  redirect("/operator/generate/dosen");
}
