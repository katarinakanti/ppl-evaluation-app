import { Irs } from "@/data/irs";
import { Khs } from "@/data/khs";
import { PklWithRelations } from "@/data/pkl";
import { SkripsiWithRelations } from "@/data/skripsi";

type MhsData = {
  irs: Irs[] | null;
  khs: Khs[] | null;
  pkl: PklWithRelations | null;
  skripsi: SkripsiWithRelations | null;
};

export type SemesterData = {
  semester: number;
  irs?: Irs;
  khs?: Khs;
  pkl?: PklWithRelations;
  skripsi?: SkripsiWithRelations;
};

export function mapProgressMhs(data: MhsData) {
  let result: SemesterData[] = [];

  for (let i = 1; i <= 8; i++) {
    let semesterData: SemesterData = {
      semester: i,
    };

    if (data.irs && data.irs.find((irs) => irs.semester === i)) {
      semesterData["irs"] = data.irs.find((irs) => irs.semester === i);
    }

    if (data.khs && data.khs.find((khs) => khs.semester === i)) {
      semesterData["khs"] = data.khs.find((khs) => khs.semester === i);
    }

    if (data.pkl && data.pkl.semester === i) {
      semesterData["pkl"] = data.pkl;
    }

    if (data.skripsi && data.skripsi.semester === i) {
      semesterData["skripsi"] = data.skripsi;
    }

    result.push(semesterData);
  }

  return result;
}

export function calculateCumulativeSks(data: Irs[]): number {
  let sksKumulatif = 0;

  data.forEach((record) => {
    const { sks_diambil } = record;
    sksKumulatif += sks_diambil;
  });

  return sksKumulatif;
}
