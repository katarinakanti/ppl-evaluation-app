"use client";

import "./Login.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<
    "mahasiswa" | "dosen" | "operator" | "departemen"
  >("mahasiswa");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email: loginType === "mahasiswa" ? `${email}@maildrop.cc` : email,
      password,
    });
    router.refresh();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <link rel="stylesheet" href="view.css" />
      <div className="login-container">
        <div className="login-photo md:shrink-0">
          <img
            className="object-cover"
            src="/img/slide1.jpg"
            height={440}
            width={420}
          />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSignIn}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-10 mt-10">
              <button type="submit">Login</button>
              {/* <Link href="/auth/register">Buat Akun</Link> */}
            </div>
          </form>
        </div>
      </div>
    </>

    // <div className="max-w-md mx-auto bg-white rounded-xl shadow-md justify-coet">
    //   <div className="md:flex">
    //     <div className="md:shrink-0">
    //       {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/slide1.png"> */}
    //     </div>
    //     <div className="p-8">
    //       <h2>Login</h2>
    //     </div>
    //   </div>
    // </div>
  );
}
