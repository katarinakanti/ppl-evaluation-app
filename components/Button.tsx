"use client";

import { useFormStatus } from "react-dom";

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
      {pending ? "Saving..." : "Save"}
    </button>
  );
};
