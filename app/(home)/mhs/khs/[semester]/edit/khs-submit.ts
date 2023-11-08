"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

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
  const fileUpload = formData.get("file");
  const isFileUploaded =
    fileUpload instanceof File &&
    fileUpload.size > 0 &&
    fileUpload.type !== "application/octet-stream";

  // Prepare your validation data. If the file is not uploaded, it will not be included in the validation
  const dataToValidate = {
    semester: formData.get("semester"),
    sks_semester: formData.get("sks_semester"),
    ip_semester: formData.get("ip_semester"),
    sks_kumulatif: formData.get("sks_kumulatif"),
    ip_kumulatif: formData.get("ip_kumulatif"),
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
      message: "There was an error in form submission.",
    };
  }

  const { semester, sks_semester, ip_semester, sks_kumulatif, ip_kumulatif } =
    validatedFields.data; // Don't destructure file here

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const nim = session?.user.user_metadata.no_induk;

    // If a file is uploaded, we handle the file upload
    if (isFileUploaded) {
      const { data: scan_khs, error: file_error } = await supabase.storage
        .from("khs-folder")
        .upload(`khs/${nim}_${semester}`, fileUpload, {
          cacheControl: "3600",
          upsert: true,
        });

      if (file_error) throw file_error;
    }

    // Prepare the record to be inserted/updated
    const record = {
      sks_semester,
      ip_semester,
      sks_kumulatif,
      ip_kumulatif,
      ...(isFileUploaded && { file_url: `khs/${nim}_${semester}` }), // Add the file URL if a file is uploaded
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
      message: "There was an error updating the KHS.",
      error: e,
    };
  }

  // Assuming revalidatePath and redirect are functions you have defined elsewhere:
  revalidatePath("/mhs/khs");
  redirect("/mhs/khs");

  // Optionally return something indicating success
  return { message: "KHS successfully updated." };
}
