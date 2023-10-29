export default function Page({ params }: { params: { semester: string } }) {
  return <div>Halaman Semester: {params.semester}</div>;
}
