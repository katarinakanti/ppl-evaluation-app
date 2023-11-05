"use client";

import { handleApprovalClick } from "@/data/dosen";

interface ApprovalButton {
  nim: string; 
}

const ApprovalButton = ({ nim }: ApprovalButton) => {
  return (
    <>
    <button
      className="bg-green-400 hover-bg-green-600 text-white font-semibold px-5 rounded"
      onClick={() => handleApprovalClick(nim)}
      >
      Approved
    </button>
    </>
  );
};

export default ApprovalButton
