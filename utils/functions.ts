import { Irs } from "@/data/irs";
import { StatusMhs } from "@/data/status_mhs";

export function mapStatusToNumber(status: string): number {
  switch (status) {
    case "Aktif":
      return 1;
    case "Cuti":
      return 2;
    case "Lulus":
      return 3;
    case "Mangkir":
      return 4;
    case "Drop Out":
      return 5;
    case "Undur Diri":
      return 6;
    case "Meninggal Dunia":
      return 7;
    default:
      throw new Error("Invalid status");
  }
}

export function mapAngkatanAndSmtToWord(angkatan: number, smt: number): string {
  const firstAcademicYear = angkatan + Math.ceil(smt / 2);
  const academicYear = `${firstAcademicYear - 1}/${firstAcademicYear}`;
  const semester = smt % 2 === 0 ? "Genap" : "Ganjil";

  return `${academicYear} ${semester}`;
}

export function getFileUrl(path: string): string {
  return `https://ysqlqkegzdalostasyxo.supabase.co/storage/v1/object/public/ppl/${path}`;
}

export function groupMahasiswaByAngkatan(
  mahasiswaData: Array<{ angkatan: number }>
) {
  const groupedByAngkatan: Record<number, Array<{ angkatan: number }>> = {};
  mahasiswaData.forEach((mahasiswa) => {
    const angkatan = mahasiswa.angkatan;
    if (!groupedByAngkatan[angkatan]) {
      groupedByAngkatan[angkatan] = [];
    }
    groupedByAngkatan[angkatan].push(mahasiswa);
  });
  return groupedByAngkatan;
}

export function groupMhsByAngkatan(
  data: Mahasiswa[]
): { angkatan: number; count: number }[] {
  const angkatanCounts: { [angkatan: number]: number } = {};

  for (const student of data) {
    if (student.angkatan) {
      if (angkatanCounts[student.angkatan]) {
        angkatanCounts[student.angkatan]++;
      } else {
        angkatanCounts[student.angkatan] = 1;
      }
    }
  }

  const result = Object.entries(angkatanCounts).map(([angkatan, count]) => ({
    angkatan: parseInt(angkatan),
    count,
  }));

  return result;
}

interface Mahasiswa {
  nim: string;
  angkatan: number;
  status_mhs_id: number;
}

export function groupByAngkatanBySemester(
  mahasiswaData: Mahasiswa[],
  irsData: Irs[]
) {
  const groupedByAngkatanBySem: Record<
    string,
    Array<{ nim: string; angkatan: number; semester: number }>
  > = {};

  mahasiswaData.forEach((mahasiswa) => {
    const angkatan = mahasiswa.angkatan;

    irsData.forEach((irs) => {
      if (irs.nim === mahasiswa.nim) {
        const key = `${angkatan}-${irs.semester}`;

        if (!groupedByAngkatanBySem[key]) {
          groupedByAngkatanBySem[key] = [];
        }

        groupedByAngkatanBySem[key].push({
          nim: mahasiswa.nim,
          angkatan: angkatan,
          semester: irs.semester,
        });
      }
    });
  });

  return groupedByAngkatanBySem;
}

export function formatDateToIndonesian(date: Date): string {
  const tanggal = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return tanggal.toLocaleDateString("id-ID", options);
}

export function transformIRSData(
  irsData: Irs[]
): { semester: number; avg_sks: number }[] {
  const semesterAvgSKS: { [semester: number]: number[] } = {};

  for (const irs of irsData) {
    const { semester } = irs;

    if (!semesterAvgSKS[semester]) {
      semesterAvgSKS[semester] = [];
    }

    semesterAvgSKS[semester].push(irs.sks_diambil);
  }

  const result = Object.entries(semesterAvgSKS).map(([semester, sksArray]) => ({
    semester: parseInt(semester),
    avg_sks: Math.round(
      sksArray.reduce((acc, sks) => acc + sks, 0) / sksArray.length
    ),
  }));

  return result;
}

export function groupMhsByAngkatanPKL(
  data: Mahasiswa[],
  sudahPKLData: Mahasiswa[]
): { angkatan: number; sudah: number; belum: number }[] {
  const angkatanCounts: { [angkatan: number]: { sudah: number; belum: number } } = {};

  for (const student of data) {
    if (student.angkatan) {
      if (angkatanCounts[student.angkatan]) {
        angkatanCounts[student.angkatan].belum++;
      } else {
        angkatanCounts[student.angkatan] = { sudah: 0, belum: 1 };
      }
    }
  }

  for (const student of sudahPKLData) {
    if (student.angkatan) {
      if (angkatanCounts[student.angkatan]) {
        angkatanCounts[student.angkatan].sudah++;
      } else {
        angkatanCounts[student.angkatan] = { sudah: 1, belum: 0 };
      }
    }
  }

  const result = Object.entries(angkatanCounts).map(([angkatan, counts]) => ({
    angkatan: parseInt(angkatan),
    sudah: counts.sudah,
    belum: counts.belum,
  }));

  return result;
}

export function groupMhsByAngkatanSkripsi(
  data: Mahasiswa[],
  sudahSkripsiData: Mahasiswa[]
): { angkatan: number; sudah: number; belum: number }[] {
  const angkatanCounts: { [angkatan: number]: { sudah: number; belum: number } } = {};

  for (const student of data) {
    if (student.angkatan) {
      if (angkatanCounts[student.angkatan]) {
        angkatanCounts[student.angkatan].belum++;
      } else {
        angkatanCounts[student.angkatan] = { sudah: 0, belum: 1 };
      }
    }
  }

  for (const student of sudahSkripsiData) {
    if (student.angkatan) {
      if (angkatanCounts[student.angkatan]) {
        angkatanCounts[student.angkatan].sudah++;
      } else {
        angkatanCounts[student.angkatan] = { sudah: 1, belum: 0 };
      }
    }
  }

  const result = Object.entries(angkatanCounts).map(([angkatan, counts]) => ({
    angkatan: parseInt(angkatan),
    sudah: counts.sudah,
    belum: counts.belum,
  }));

  return result;
}

export function groupMhsByStatusByAngkatan(
  data: Mahasiswa[],
  statusMhsData: StatusMhs[]
): { angkatan: number; aktif: number; cuti: number; lulus: number; mangkir: number; dropOut: number, undurdiri:number, meninggal:number }[] {
  const angkatanCounts: { [angkatan: number]: { [status: string]: number } } = {};

  for (const student of data) {
    if (student.angkatan && student.status_mhs_id) {
      const angkatan = student.angkatan;
      const statusNumber = mapStatusToNumber(
        statusMhsData.find((status) => status.id === student.status_mhs_id)?.nama || ""
      );

      if (angkatanCounts[angkatan]) {
        angkatanCounts[angkatan][statusNumber]++;
      } else {
        angkatanCounts[angkatan] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
        angkatanCounts[angkatan][statusNumber]++;
      }
    }
  }

  const result = Object.entries(angkatanCounts).map(([angkatan, statusCounts]) => ({
    angkatan: parseInt(angkatan),
    aktif: statusCounts[1],
    cuti: statusCounts[2],
    lulus: statusCounts[3],
    mangkir: statusCounts[4],
    dropOut: statusCounts[5],
    undurdiri: statusCounts[6],
    meninggal: statusCounts[7],
  }));

  return result;
}


