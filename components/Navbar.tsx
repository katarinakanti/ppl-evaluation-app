"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NonAuthNavbar() {
  return (
    <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/auth/register"}
        >
          Register
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/auth/login"}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export function MhsNavbar() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/"}>
          Home
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/mhs/profile"}
        >
          Profile
        </Link>
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/mhs/irs"}>
          IRS
        </Link>
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/mhs/khs"}>
          KHS
        </Link>
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/mhs/pkl"}>
          PKL
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/mhs/skripsi"}
        >
          Skripsi
        </Link>
        <button
          className="hover:bg-gray-300 px-3 py-2 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DosenNavbar() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/"}>
          Home
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/dosen/profile"}
        >
          Profile
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/dosen/irs"}
        >
          IRS
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/dosen/khs"}
        >
          KHS
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/dosen/pkl"}
        >
          PKL
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/dosen/skripsi"}
        >
          Skripsi
        </Link>
        <button
          className="hover:bg-gray-300 px-3 py-2 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export function OpNavbar() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link className="hover:bg-gray-300 px-2 py-2 rounded" href="/">
          Home
        </Link>
        <Link
          className="hover:bg-gray-300 px-2 py-2 rounded"
          href="/operator/profile"
        >
          Profile
        </Link>
        <Link
          className="hover:bg-gray-300 px-2 py-2 rounded"
          href="/operator/generate/mhs"
        >
          Generate Mahasiswa
        </Link>
        <Link
          className="hover:bg-gray-300 px-2 py-2 rounded"
          href="/operator/generate/dosen"
        >
          Generate Dosen
        </Link>
        <Link
          className="hover:bg-gray-300 px-2 py-2 rounded"
          href="/operator/generate/csv"
        >
          Generate CSV
        </Link>
        <button
          className="hover:bg-gray-300 px-3 py-2 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DeptNavbar() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link className="hover:bg-gray-300 px-3 py-2 rounded" href={"/"}>
          Home
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/profile"}
        >
          Profile
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/irs"}
        >
          IRS
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/progress"}
        >
          Progress Mahasiswa
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/khs"}
        >
          KHS
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/pkl"}
        >
          PKL
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/skripsi"}
        >
          Skripsi
        </Link>
        <Link
          className="hover:bg-gray-300 px-3 py-2 rounded"
          href={"/departemen/status"}
        >
          Status
        </Link>
        <button
          className="hover:bg-gray-300 px-3 py-2 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
