import { serverActionSupabase as supabase } from "@/lib/supabaseClient";

export type Departemen = {
    nip: string;
    nama: string;
    created_at: string;
    updated_at: string;
};

export type Dosen = {
    nip: string;
    nama: string;
    created_at: string;
    updated_at: string;
};

export type Mhs = {
    nim: string;
    angkatan: string;
    doswal_nip: string;
    nama: string;
};

export async function fetchAllMahasiswa(): Promise<Mhs[]> {
    try {
        const mahasiswa = await supabase
            .from("mahasiswa")
            .select(`*`);

        if (!mahasiswa.data || mahasiswa.data.length === 0) {
            throw new Error("No mahasiswa found");
        }

        return mahasiswa.data as Mhs[];
    } catch (error) {
        console.error("Failed to fetch mahasiswa data: ", error);
        throw new Error("Failed to fetch mahasiswa");
    }
}
export async function fetchAllDepartemen(): Promise<Departemen[]> {
    try {
        const departemen = await supabase.from("departemen").select("*");
        return departemen.data as Departemen[];
    } catch (error) {
        console.error("Failed to fetch departemen data: ", error);
        throw new Error("Failed to fetch departemen");
    }
}

export async function fetchAllDosen(): Promise<Dosen[]> {
    try {
        const dosen = await supabase.from("dosen").select("*");
        return dosen.data as Dosen[];
    } catch (error) {
        console.error("Failed to fetch dosen data: ", error);
        throw new Error("Failed to fetch dosen");
    }
}

export async function fetchDosenByNip(nip: string): Promise<Dosen> {
    try {
        const dosen = await supabase
        .from("dosen")
        .select("*")
        .eq("nip", nip)
        .single();
        if (!dosen.data) {
        throw new Error("Dosen not found");
        }
        return dosen.data as Dosen;
    } catch (error) {
        console.error("Failed to fetch dosen data: ", error);
        throw new Error("Failed to fetch dosen");
    }
}

export async function fetchMhsByAngkt(
angkatan: number
): Promise<Mhs[]> {
try {
    const mahasiswa = await supabase
    .from("mahasiswa")
    .select(
        `
        *
    `
    )
    .eq("angkatan", angkatan);
    if (!mahasiswa.data) {
    throw new Error("khs not found");
    }
    return mahasiswa.data as Mhs[];
} catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa data");
}
}

export async function fetchMhsByNip(nip: string): Promise<Mhs[]> {
    try {
        const mahasiswa = await supabase
        .from("mahasiswa")
        .select(
            `
            *
        `
        )
        .eq("doswal_nip", nip);
        if (!mahasiswa.data) {
        throw new Error("mahasiswa not found");
        }
        return mahasiswa.data as Mhs[];
    } catch (error) {
        console.error("Failed to fetch mahasiswa data: ", error);
        throw new Error("Failed to fetch mahasiswa");
    }
}

export async function fetchMahasiswaByNim(nim: string, angkatan: number): Promise<Mhs[]> {
try {
    const mahasiswa = await supabase
    .from("mahasiswa")
    .select(`*`)
    .eq("nim", nim)
    .eq("angkatan", angkatan);
    if (!mahasiswa.data || mahasiswa.data.length === 0) {
    throw new Error("mahasiswa not found");
    }
    return mahasiswa.data as Mhs[];
} catch (error) {
    console.error("Failed to fetch mahasiswa data: ", error);
    throw new Error("Failed to fetch mahasiswa");
}
}



