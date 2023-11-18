"use server";
import { serverActionAdminSupabase as supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mapStatusToNumber } from "@/utils/functions";
import { cookies } from "next/headers";

import { MahasiswaSchema } from "@/data/mahasiswa";
import { MahasiswaState } from "@/data/mahasiswa";

import { DosenSchema } from "@/data/dosen";
import { DosenState } from "@/data/dosen";

import { OperatorSchema } from "@/data/operator";
import { OperatorState } from "@/data/operator";

import { DepartemenSchema } from "@/data/departemen";
import { DepartemenState } from "@/data/departemen";

const UpdateMahasiswa = MahasiswaSchema.pick({
  jalur_masuk_id: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});

const UpdateDosen = DosenSchema.pick({
  nidn: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});

const UpdateDepartemen = DepartemenSchema.pick({
  nidn: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});

const UpdateOperator = OperatorSchema.pick({
  nidn: true,
  no_hp: true,
  email: true,
  alamat: true,
  kota_id: true,
});


//Mahasiswa
export async function updateMhs(prevState: MahasiswaState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateMahasiswa.safeParse({
    jalur_masuk_id: formData.get("jalur_masuk_id"),
    no_hp: formData.get("no_hp"),
    email: formData.get("email"),
    alamat: formData.get("alamat"),
    kota_id: formData.get("kota_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { jalur_masuk_id, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nim = user?.user_metadata.no_induk;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("mahasiswa")
      .update({
        jalur_masuk_id,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nim", nim);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }
  // revalidatePath("/profile");
  // redirect("/profile");
}

//Dosen
export async function updateDosen(prevState: DosenState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateDosen.safeParse({
    nidn: formData.get("nidn"),
    no_hp: formData.get("no_hp"),
    email: formData.get("email"),
    alamat: formData.get("alamat"),
    kota_id: formData.get("kota_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nidn, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nip = user?.user_metadata.nip;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("dosen")
      .update({
        nidn,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nip", nip);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

}

//Departemen
export async function updateDepartemen(prevState: DepartemenState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateDepartemen.safeParse({
    nidn: formData.get("nidn"),
    no_hp: formData.get("no_hp"),
    email: formData.get("email"),
    alamat: formData.get("alamat"),
    kota_id: formData.get("kota_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nidn, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nip = user?.user_metadata.nip;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("dosen")
      .update({
        nidn,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nip", nip);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

}

//Operator
export async function updateOperator(prevState: OperatorState, formData: FormData) {
  // 1. Validate the form data
  const validatedFields = UpdateOperator.safeParse({
    nidn: formData.get("nidn"),
    no_hp: formData.get("no_hp"),
    email: formData.get("email"),
    alamat: formData.get("alamat"),
    kota_id: formData.get("kota_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ada kesalahan dalam pengisian form.",
    };
  }

  const { nidn, no_hp, email, alamat, kota_id } =
    validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = user!.id;
  const nip = user?.user_metadata.nip;

  try {
    await supabase.auth.admin.updateUserById(id!, {
      user_metadata: {
        no_hp,
      },
    });

    await supabase
      .from("dosen")
      .update({
        nidn,
        no_hp,
        email,
        alamat,
        kota_id,
      })
      .eq("nip", nip);
  } catch (e) {
    return {
      message: "Ada kesalahan dalam pembuatan akun.",
    };
  }

}