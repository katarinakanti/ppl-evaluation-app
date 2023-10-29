"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NonAuthNavbar() {
  return (
    <div className="flex gap-2">
      <Link href={"/auth/register"}>Register</Link>
      <Link href={"/auth/login"}>Sign in</Link>
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
    <div className="flex gap-2">
      <Link href={"/"}>Home</Link>
      <Link href={"/mhs/irs"}>IRS</Link>
      <Link href={"/mhs/khs"}>KHS</Link>
      <Link href={"/mhs/pkl"}>PKL</Link>
      <Link href={"/mhs/skripsi"}>Skripsi</Link>
      <button onClick={handleSignOut}>Sign out</button>
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
    <div className="flex gap-2">
      <Link className="bg-blue-200 m-2 p-2" href="/operator/generate">
        Generate Mahasiswa
      </Link>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
