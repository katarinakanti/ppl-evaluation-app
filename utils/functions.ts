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

export function groupMahasiswaByAngkatan(mahasiswaData: Array<{ angkatan: number }>) {
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
