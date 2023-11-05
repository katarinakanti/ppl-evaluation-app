"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { PklSchema } from "@/data/pkl";
import { PklState } from "@/data/pkl";
import { z } from "zod";

const CreatePklSchema = PklSchema.pick({
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
    ...CreatePklSchema.shape,
    ...FileSchema.shape,
    });

    export async function createPkl(prevState: PklState, formData: FormData) {
    const validatedFields = MergedSchema.safeParse({
        dosen_pembimbing: formData.get("dosen_pembimbing"),
        waktu_pkl: formData.get("waktu_pkl"),
        status_pkl: formData.get("status_pkl"),
        nilai_pkl: formData.get("nilai_pkl"),
        file: formData.get("file"),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Ada kesalahan dalam pengisian form.",
        };
    }

    const { dosen_pembimbing, waktu_pkl, status_pkl, nilai_pkl, file } = validatedFields.data;

    try {
        const {
        data: { user },
        } = await supabase.auth.getUser();

        const nim = user?.user_metadata.no_induk;

        const { data: upload_file, error: file_error } = await supabase.storage
        .from("ppl")
        .upload(`pkl/${nim}`, file, {
            cacheControl: "3600",
            upsert: false,
        });

        const { data, error } = await supabase.from("pkl").insert([
        {
            nim,
            dosen_pembimbing,
            waktu_pkl,
            status_pkl,
            nilai_pkl,
            upload_file: upload_file!.path,
        },
        ]);
    } catch (e) {
        return {
        message: "Ada kesalahan dalam pembuatan PKL.",
        };
    }
    revalidatePath("/mhs/pkl");
    redirect("/mhs/pkl");
}
