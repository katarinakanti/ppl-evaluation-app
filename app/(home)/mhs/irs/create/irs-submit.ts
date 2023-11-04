"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { IrsSchema } from "@/data/irs";
import { IrsState } from "@/data/irs";
import { z } from "zod";

const CreateIrsSchema = IrsSchema.pick({
  semester: true,
  sks_diambil: true,
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPE = "application/pdf";

const FileSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => files?.type === ACCEPTED_FILE_TYPE,
      "Only .pdf format is supported."
    ),
});

const MergedSchema = z.object({
  ...CreateIrsSchema.shape,
  ...FileSchema.shape,
});

export async function createIrs(prevState: IrsState, formData: FormData) {
  const validatedFields = MergedSchema.safeParse({
    semester: formData.get("semester"),
    sks_diambil: formData.get("sks_diambil"),
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { semester, sks_diambil, file } = validatedFields.data;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const nim = user?.user_metadata.no_induk;

    const { data: scan_irs, error: file_error } = await supabase.storage
      .from("ppl")
      .upload(`irs/${nim}_${semester}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data, error } = await supabase.from("irs").insert([
      {
        nim,
        semester,
        sks_diambil,
        scan_irs: scan_irs!.path,
      },
    ]);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan IRS.",
    };
  }
  revalidatePath("/mhs/irs");
  redirect("/mhs/irs");
}
