"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NonAuthNavbar() {
  return (

    <div className="p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link href={"/auth/register"}>Register</Link>
        <Link href={"/auth/login"}>Sign in</Link>
      </div>
    </div>
  );
}

export function AuthNavbar() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
   
    <div className="p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
      <div className="flex gap-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/mhs/irs"}>IRS</Link>
        <Link href={"/mhs/khs"}>KHS</Link>
        <Link href={"/mhs/pkl"}>PKL</Link>
        <Link href={"/mhs/skripsi"}>Skripsi</Link>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
}
