    "use server";
    import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
    import { revalidatePath } from "next/cache";
    import { redirect } from "next/navigation";

    import { IrsSchema } from "@/data/irs";
    import { IrsState } from "@/data/irs";
    import { z } from "zod";
    import { FileSchema } from "@/data/file";

    const EditIrsSchema = IrsSchema.pick({
    semester: true,
    sks_diambil: true,
    });

    const MergedSchema = z.object({
    ...EditIrsSchema.shape,
    ...FileSchema.shape,
    });

    export async function updateIrs(prevState: IrsState, formData: FormData) {
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
    isFileUploaded ? MergedSchema : EditIrsSchema
    ).safeParse(dataToValidate);

    if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Ada kesalahan dalam pengisian form.",
    };
    }

    const { semester, sks_diambil } = validatedFields.data; // Don't destructure file here

    try {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const nim = session?.user.user_metadata.no_induk;

    // If a file is uploaded, we handle the file upload
    if (isFileUploaded) {
        const { data: scan_irs, error: file_error } = await supabase.storage
        .from("ppl")
        .upload(`irs/${nim}_${semester}`, fileUpload, {
            cacheControl: "3600",
            upsert: true,
        });
    }

    // Prepare the record to be inserted/updated
    const record = {
        nim,
        semester,
        sks_diambil,
    };

    const { data, error } = await supabase
        .from("irs")
        .update(record)
        .eq("nim", nim)
        .eq("semester", semester);

    if (error) throw error;
    } catch (e) {
    console.error(e); // Log the error for debugging purposes
    return {
        message: "Ada kesalahan dalam pembuatan IRS.",
        error: e,
    };
    }

    // Assuming revalidatePath and redirect are functions you have defined elsewhere:
    revalidatePath("/dosen/irs");
    redirect("/dosen/irs");

    // Optionally return something indicating success
    return { message: "IRS berhasil diperbarui." };
}
