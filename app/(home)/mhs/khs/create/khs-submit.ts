"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { KhsSchema } from "@/data/khs";
import { KhsState } from "@/data/khs";
import { z } from "zod";

const CreateKhsSchema = KhsSchema.pick({
  semester: true,
  sks_semester: true,
  ip_semester: true,
  sks_kumulatif: true,
  ip_kumulatif: true,
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPE = "application/pdf";

const FileSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 500KB.`)
    .refine(
      (files) => files?.type === ACCEPTED_FILE_TYPE,
      "Only .pdf format is supported."
    ),
});

const MergedSchema = z.object({
  ...CreateKhsSchema.shape,
  ...FileSchema.shape,
});

export async function createKhs(prevState: KhsState, formData: FormData) {
  const validatedFields = MergedSchema.safeParse({
    semester: formData.get("semester"),
    sks_semester: formData.get("sks_semester"),
    ip_semester: formData.get("ip_semester"),
    sks_kumulatif: formData.get("sks_kumulatif"),
    ip_kumulatif: formData.get("ip_kumulatif"),
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const {
    semester,
    sks_semester,
    ip_semester,
    sks_kumulatif,
    ip_kumulatif,
    file,
  } = validatedFields.data;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const nim = user?.user_metadata.no_induk;

    // Upload file to storage
    const { data: scan_khs, error: file_error } = await supabase.storage
      .from("ppl")
      .upload(`khs/${nim}_${semester}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // Insert to database
    const { data, error } = await supabase.from("khs").insert([
      {
        nim,
        semester,
        sks_semester,
        ip_semester,
        sks_kumulatif,
        ip_kumulatif,
        scan_khs: scan_khs!.path,
      },
    ]);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan KHS.",
    };
  }
  revalidatePath("/mhs/khs");
  redirect("/mhs/khs");
}
