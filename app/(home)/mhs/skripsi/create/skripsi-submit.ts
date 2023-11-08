"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { SkripsiSchema } from "@/data/skripsi";
import { SkripsiState } from "@/data/skripsi";
import { z } from "zod";

const CreateSkripsiSchema = SkripsiSchema.pick({
    dosen_pembimbing_nip: true,
    tgl_sidang: true,
    nilai_skripsi: true,
    semester: true,
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
    ...CreateSkripsiSchema.shape,
    ...FileSchema.shape,
    });

    export async function createSkripsi(prevState: SkripsiState, formData: FormData) {
    const validatedFields = MergedSchema.safeParse({
        dosen_pembimbing_nip: formData.get("dosen_pembimbing_nip"),
        semester: formData.get("semester"),
        tgl_sidang: formData.get("tgl_sidang"),
        nilai_skripsi: formData.get("nilai_skripsi"),
        file: formData.get("file"),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Ada kesalahan dalam pengisian form.",
        };
    }

    const { dosen_pembimbing_nip, tgl_sidang, nilai_skripsi, semester, file } =
        validatedFields.data;

    try {
        const {
        data: { session },
        } = await supabase.auth.getSession();

        const nim = session?.user.user_metadata.no_induk;

        const { data: upload_file, error: file_error } = await supabase.storage
        .from("ppl")
        .upload(`skripsi/${nim}`, file, {
            cacheControl: "3600",
            upsert: true,
        });

    const { data, error } = await supabase.from("skripsi").insert([
    {
        nim,
        dosen_pembimbing_nip,
        tgl_sidang,
        nilai_skripsi,
        semester,
        scan_skripsi: upload_file!.path,
    },
    ]);
    } catch (e) {
        console.error("Failed to create Skripsi: ", e);
        return {
        message: "Ada kesalahan dalam pembuatan Skripsi.",
        };
    }
    revalidatePath("/mhs/skripsi");
    redirect("/mhs/skripsi");
}
