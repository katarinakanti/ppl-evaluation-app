"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { KhsSchema } from "@/data/khs";
import { KhsState } from "@/data/khs";
import { z } from "zod";
import { FileSchema } from "@/data/file";

const EditKhsSchema = KhsSchema.pick({
  semester: true,
  sks_semester: true,
  ip_semester: true,
  sks_kumulatif: true,
  ip_kumulatif: true,
});

const MergedSchema = z.object({
  ...EditKhsSchema.shape,
  ...FileSchema.shape,
});

export async function updateKhs(prevState: KhsState, formData: FormData) {
  const nim = formData.get("nim");
  const angkatan = formData.get("angkatan");
  const fileUpload = formData.get("file");
  // Assuming fileUpload is a File object when a file is uploaded and `null` otherwise
  const isFileUploaded =
    fileUpload instanceof File &&
    fileUpload.size > 0 &&
    fileUpload.type !== "application/octet-stream";

  // Prepare your validation data. If the file is not uploaded, it will not be included in the validation
  const dataToValidate = {
    semester: formData.get("semester"),
    sks_diambil: formData.get("sks_diambil"),
    ...(isFileUploaded && { file: fileUpload }),
  };

  // Validate the data
  const validatedFields = (
    isFileUploaded ? MergedSchema : EditKhsSchema
  ).safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { semester, sks_semester, ip_semester, sks_kumulatif, ip_kumulatif } = validatedFields.data; // Don't destructure file here

  try {
    // If a file is uploaded, we handle the file upload
    if (isFileUploaded) {
      const { data: scan_khs, error: file_error } = await supabase.storage
        .from("ppl")
        .upload(`khs/${nim}_${semester}`, fileUpload, {
          cacheControl: "3600",
          upsert: true,
        });
    }

    // Prepare the record to be inserted/updated
    const record = {
      nim,
      semester,
      sks_semester, 
      ip_semester, 
      sks_kumulatif, 
      ip_kumulatif,
    };

    const { data, error } = await supabase
      .from("khs")
      .update(record)
      .eq("nim", nim)
      .eq("semester", semester);

    if (error) throw error;
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    return {
      message: "Ada kesalahan dalam pembuatan KHS.",
      error: e,
    };
  }

  // Assuming revalidatePath and redirect are functions you have defined elsewhere:
  revalidatePath(`/dosen/khs/${angkatan}/${nim}/${semester}`);
  redirect(`/dosen/khs/${angkatan}/${nim}/${semester}`);

  // Optionally return something indicating success
  return { message: "KHS berhasil diperbarui." };
}
