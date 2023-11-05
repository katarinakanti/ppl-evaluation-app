import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

import { z } from "zod";

export const PklSchema = z.object({
    nim: z.string(),
    dosen_pembimbing: z.coerce
    .string({ invalid_type_error: "Tolong pilih Dosen Pembimbing" }),

    waktu_pkl: z.coerce.
    number({ invalid_type_error: "Tolong isi Waktu PKL" }),

    status_pkl: z.coerce
    .string({ invalid_type_error: "Tolong isi Status PKL" }),

    status_verifikasi_id: z.number().default(1),

    nilai_pkl: z.coerce
    .string({ invalid_type_error: "Tolong isi Nilai PKL" }),
    
    upload_file: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

    export type Pkl = z.infer<typeof PklSchema>;

    export type PklState = {
    errors?: {
        nim?: string[];
        dosen_pembimbing?: string[];
        waktu_pkl?: string[];
        status_pkl?: string[];
        status_verifikasi_id?: string[];
        nilai_pkl?: string[];
        file?: string[];
        upload_file?: string[];
        created_at?: string[];
        updated_at?: string[];
    };
    message?: string | null;
    };

    export async function fetchPklByNim(nim: string): Promise<Pkl[]> {
    try {
        const pkl = await supabase
        .from("pkl")
        .select(
            `
            *
        `
        )
        .eq("nim", nim);

        if (!pkl.data) {
        throw new Error("PKL not found");
        }
        return pkl.data as Pkl[];
    } catch (error) {
        console.error("Failed to fetch mahasiswa data: ", error);
        throw new Error("Failed to fetch mahasiswa");
    }
    }

    export async function fetchPklByNimById(
    nim: string,
    id: number
    ): Promise<Pkl> {
    try {
        const pkl = await supabase
        .from("pkl")
        .select(
            `
            *
        `
        )
        .eq("nim", nim)
        .eq("id", id)
        .single();

        if (!pkl.data) {
        throw new Error("PKL not found");
        }
        return pkl.data as Pkl;
    } catch (error) {
        console.error("Failed to fetch pkl data: ", error);
        throw new Error("Failed to fetch pkl data");
    }
}
