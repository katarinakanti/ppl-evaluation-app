"use client";

import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Irs } from "@/data/irs";

export const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      type="submit"
      className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-10 font-semibold rounded
                disabled:opacity-50 disabled:cursor-not-allowed
                "
    >
      {pending ? "Saving..." : "Simpan"}
    </button>
  );
};

type ApproveButtonProps = {
  nip: string;
  irs: Irs;
};
export const ApproveButton = ({ nip, irs }: ApproveButtonProps) => {
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState<"Approve" | "Disapprove" | "Loading">(
    "Loading"
  );
  const handleClick = async () => {
    setStatus("Loading");
    const { data, error } = await supabase
      .from("irs")
      .update({ status_verifikasi_id: irs.status_verifikasi_id === 1 ? 2 : 1 })
      .eq("nim", irs.nim)
      .eq("semester", irs.semester);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setStatus(irs.status_verifikasi_id === 1 ? "Disapprove" : "Approve");
    }
    // revalidatePath(`/dosen/irs/${angkatan}/${irs.nim}/${irs.semester}`);
    // redirect(`/dosen/irs/${angkatan}/${irs.nim}/${irs.semester}`);
  };

  useEffect(() => {
    switch (irs.status_verifikasi_id) {
      case 1:
        setStatus("Approve");
        break;
      case 2:
        setStatus("Disapprove");
        break;
      default:
        setStatus("Loading");
        break;
    }
  }, [irs]);

  return (
    <button
      onClick={handleClick}
      disabled={status === "Loading"}
      className="w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-5 font-semibold rounded
    disabled:opacity-50 disabled:cursor-not-allowed
    "
    >
      {status}
    </button>
  );
};

export const PrintButton = () => {
  return (
    <button
      className="print:hidden w-32 h-10 ml-10 bg-white hover:bg-blue-100 text-blue-400 border border-blue-400 px-5 font-semibold rounded
    disabled:opacity-50 disabled:cursor-not-allowed
    "
      onClick={() => window.print()}
    >
      Print
    </button>
  );
};
