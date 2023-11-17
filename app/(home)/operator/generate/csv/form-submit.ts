"use server";

import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CsvSchema = z.object({
  csv: z.string(),
});

type FileState = {
  errors?: {
    csv?: string[];
  };
  message?: string | null;
};

export async function generateMhsCsv(prevState: FileState, formData: FormData) {
  const validatedFields = CsvSchema.safeParse({
    csv: formData.get("csv"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { csv } = validatedFields.data;

  try {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(",");
      if (data.length === headers.length) {
        const [nim, nama, angkatan, doswal_nip] = data;

        const email = `${nim.trim()}@maildrop.cc`;

        // // Create account using admin API
        await supabase.auth.admin
          .createUser({
            email: email,
            password: nim.trim(),
            email_confirm: true,
            user_metadata: {
              nama,
              no_induk: nim.trim(),
              role: "mahasiswa",
            },
          })
          .then((res) => {
            console.log("Creating user", nama, res.data);
          });

        // Insert user data into the mahasiswa table
        await supabase
          .from("mahasiswa")
          .insert([
            {
              nim: nim.trim(),
              nama: nama.trim(),
              angkatan: angkatan.trim(),
              doswal_nip: doswal_nip.trim(),
              status_mhs_id: 1,
            },
          ])
          .then((res) => {
            console.log("Inserting user", nama, res);
          });
      }
    }

    console.log("All users created successfully");
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

  revalidatePath("/operator/generate/csv");
  redirect("/operator/generate/csv");
}
