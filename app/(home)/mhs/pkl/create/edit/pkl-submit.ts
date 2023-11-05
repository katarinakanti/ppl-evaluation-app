"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { PklSchema } from "@/data/pkl";
import { PklState } from "@/data/pkl";
import { z } from "zod";

const EditPklSchema = PklSchema.pick({
    dosen_pembimbing: true,
    waktu_pkl: true,
    status_pkl: true,
    nilai_pkl: true,
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
    ...EditPklSchema.shape,
    ...FileSchema.shape,
    });

    export async function updatePkl(prevState: PklState, formData: FormData) {
    const fileUpload = formData.get("file");

    const isFileUploaded =
    fileUpload instanceof File &&
    fileUpload.size > 0 &&
    fileUpload.type !== "application/octet-stream";

    const dataToValidate =({
        dosen_pembimbing: formData.get("dosen_pembimbing"),
        waktu_pkl: formData.get("waktu_pkl"),
        status_pkl: formData.get("status_pkl"),
        nilai_pkl: formData.get("nilai_pkl"),
        ...(isFileUploaded && { file: fileUpload }),
    });

    const validatedFields = MergedSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Ada kesalahan dalam pengisian form.",
        };
    }

    const { dosen_pembimbing, waktu_pkl, status_pkl, nilai_pkl} = validatedFields.data;

    try {
        const {
        data: { user },
        } = await supabase.auth.getUser();

        const nim = user?.user_metadata.no_induk;
        const id = user?.user_metadata.id;

        let upload_file_path;

        if (isFileUploaded) {
        const { data: upload_file, error: file_error } = await supabase.storage
            .from("ppl")
            .upload(`irs/${nim}`, fileUpload, {
            cacheControl: "3600",
            upsert: true,
            });
    
            if (file_error) throw file_error;
    
            upload_file_path = upload_file.path;
        }

        const record = {
            nim,
            dosen_pembimbing,
            waktu_pkl,
            status_pkl,
            nilai_pkl,
            ...(upload_file_path && { upload_file: upload_file_path }),
        };

        const { data, error } = await supabase
        .from("pkl")
        .update(record)
        .eq("nim", nim)
        .eq("id", id);

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
