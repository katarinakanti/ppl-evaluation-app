"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";

import { mapStatusToNumber } from "@/utils/functions";

const supabase = createServerActionClient(
  { cookies },
  { supabaseKey: process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY }
);

const UserSchema = z.object({
  id: z.string(),
  nama: z.string({
    invalid_type_error: "Isi namanya yang sesuai ya.",
  }),
  no_induk: z.string({
    invalid_type_error: "Isi nomor induknya yang sesuai ya.",
  }),
  angkatan: z.coerce
    .number()
    .gt(2004, { message: "Isi angkatannya yang bener yaa" }),
  status: z.enum(["Aktif", "Cuti", "Lulus", "Mangkir", "Drop Out"], {
    invalid_type_error: "Isi statusnya yang sesuai ya.",
  }),
});

export type State = {
  errors?: {
    nama?: string[];
    no_induk?: string[];
    angkatan?: string[];
    status?: string[];
  };
  message?: string | null;
};

const GenerateUser = UserSchema.omit({ id: true });
export async function generateMhs(prevState: State, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = GenerateUser.safeParse({
    nama: formData.get("nama"),
    no_induk: formData.get("no_induk"),
    angkatan: formData.get("angkatan"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nama, no_induk, angkatan, status } = validatedFields.data;

  // 2. Create dummy email that is no_induk@maildrop.cc
  const email = `${no_induk}@maildrop.cc`;

  try {
    // 3. Create account using admin api
    await supabase.auth.admin.createUser({
      email: email,
      password: no_induk,
      email_confirm: true,
      user_metadata: {
        nama,
        no_induk,
        role: "mahasiswa",
      },
    });
    // 4. create also the user on the correlated table (mahasiswa, dosen)
    const statusNumber = mapStatusToNumber(status);
    const { data, error } = await supabase.from("mahasiswa").insert([
      {
        nim: no_induk,
        nama,
        angkatan,
        status_mhs_id: statusNumber,
      },
    ]);

    console.log("data", data);
    console.log("error", error);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/operator/generate");
  redirect("/operator/generate");
}
