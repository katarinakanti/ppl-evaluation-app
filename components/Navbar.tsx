"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

interface Link {
  href: string;
  label: string;
}

interface NavbarProps {
  links: Link[];
  onSignOut: MouseEventHandler;
}

const Navbar: React.FC<NavbarProps> = ({ links, onSignOut }) => (
  <div className="print:hidden p-5 flex items-center mx-auto bg-gray-100 border w-full h-16">
    <div className="flex gap-5">
      {links.map((link) => (
        <NavbarLink key={link.href} href={link.href}>
          {link.label}
        </NavbarLink>
      ))}
      <NavbarButton onClick={onSignOut}>Sign out</NavbarButton>
    </div>
  </div>
);

export function NonAuthNavbar() {
  return (
    <Navbar
      links={[
        { href: "/auth/register", label: "Register" },
        { href: "/auth/login", label: "Sign in" },
      ]}
      onSignOut={() => {}}
    />
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
    <Navbar
      links={[
        { href: "/", label: "Home" },
        { href: "/mhs/profile", label: "Profile" },
        { href: "/mhs/irs", label: "IRS" },
        { href: "/mhs/khs", label: "KHS" },
        { href: "/mhs/pkl", label: "PKL" },
        { href: "/mhs/skripsi", label: "Skripsi" },
      ]}
      onSignOut={handleSignOut}
    />
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
    <Navbar
      links={[
        { href: "/", label: "Home" },
        { href: "/dosen/profile", label: "Profile" },
        { href: "/dosen/irs", label: "IRS" },
        { href: "/dosen/khs", label: "KHS" },
        { href: "/dosen/pkl", label: "PKL" },
        { href: "/dosen/skripsi", label: "Skripsi" },
      ]}
      onSignOut={handleSignOut}
    />
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
    <Navbar
      links={[
        { href: "/", label: "Home" },
        { href: "/operator/profile", label: "Profile" },
        { href: "/operator/mhs", label: "Data Mahasiswa" },
        { href: "/operator/generate/mhs", label: "Generate Mahasiswa" },
        { href: "/operator/generate/dosen", label: "Generate Dosen" },
        { href: "/operator/generate/csv", label: "Generate CSV" },
        { href: "/operator/irs/", label: "IRS" },
        { href: "/operator/khs/", label: "KHS" },
        { href: "/operator/pkl/", label: "PKL" },
        { href: "/operator/skripsi/", label: "Skripsi" },
      ]}
      onSignOut={handleSignOut}
    />
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
    <Navbar
      links={[
        { href: "/", label: "Home" },
        { href: "/departemen/profile", label: "Profile" },
        { href: "/departemen/progress", label: "Progress Mahasiswa" },
        { href: "/departemen/pkl", label: "PKL" },
        { href: "/departemen/skripsi", label: "Skripsi" },
        { href: "/departemen/status", label: "Status" },
      ]}
      onSignOut={handleSignOut}
    />
  );
}

const NavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link className="hover:bg-gray-300 px-2 py-2 rounded" href={href}>
    {children}
  </Link>
);

const NavbarButton = ({
  onClick,
  children,
}: {
  onClick: MouseEventHandler;
  children: ReactNode;
}) => (
  <button className="hover:bg-gray-300 px-3 py-2 rounded" onClick={onClick}>
    {children}
  </button>
);
