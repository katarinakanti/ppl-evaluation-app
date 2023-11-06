"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { PklSchema } from "@/data/pkl";
import { PklState } from "@/data/pkl";
import { z } from "zod";

const EditPklSchema = PklSchema.pick({
  dosen_pembimbing_nip: true,
  waktu_pkl: true,
  nilai_pkl: true,
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
  ...EditPklSchema.shape,
  ...FileSchema.shape,
});

export async function updatePkl(prevState: PklState, formData: FormData) {
  const fileUpload = formData.get("file");

  const isFileUploaded =
    fileUpload instanceof File &&
    fileUpload.size > 0 &&
    fileUpload.type !== "application/octet-stream";

  const dataToValidate = {
    dosen_pembimbing_nip: formData.get("dosen_pembimbing_nip"),
    waktu_pkl: formData.get("waktu_pkl"),
    status_pkl: formData.get("status_pkl"),
    nilai_pkl: formData.get("nilai_pkl"),
    ...(isFileUploaded && { file: fileUpload }),
  };

  const validatedFields = (
    isFileUploaded ? MergedSchema : EditPklSchema
  ).safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { dosen_pembimbing_nip, waktu_pkl, nilai_pkl } = validatedFields.data;

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const nim = session?.user?.user_metadata.no_induk;

    if (isFileUploaded) {
      const { data: upload_file, error: file_error } = await supabase.storage
        .from("ppl")
        .update(`pkl/${nim}`, fileUpload, {
          cacheControl: "3600",
          upsert: true,
        });

      if (file_error) throw file_error;
    }

    const record = {
      dosen_pembimbing_nip,
      waktu_pkl,
      nilai_pkl,
    };

    const { data, error } = await supabase
      .from("pkl")
      .update(record)
      .eq("nim", nim);

    if (error) throw error;
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan PKL.",
    };
  }
  revalidatePath("/mhs/pkl");
  redirect("/mhs/pkl");

  return { message: "PKL berhasil diperbarui." };
}
