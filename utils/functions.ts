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
