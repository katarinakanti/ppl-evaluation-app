import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  formatDateToIndonesian,
  getFileUrl,
  mapStatusVerifikasiToNumber,
} from "@/utils/functions";
import { SemesterData } from "@/utils/helper";

// Define the types for your props
interface ProgressSemestersProps {
  semestersData: SemesterData[];
  SEMESTER_TOTAL: number;
}

const ProgressSemesters: React.FC<ProgressSemestersProps> = ({
  semestersData,
  SEMESTER_TOTAL,
}) => {
  // Create a map of semester colors
  const semesterColors = new Map<number, string>();
  semestersData.forEach((data) => {
    if (data.skripsi) {
      semesterColors.set(
        data.semester,
        "bg-green-600 hover:bg-green-700 cursor-pointer"
      );
    } else if (data.pkl) {
      semesterColors.set(
        data.semester,
        "bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
      );
    } else if (data.irs && data.khs) {
      semesterColors.set(
        data.semester,
        "bg-blue-600 hover:bg-blue-700 cursor-pointer"
      );
    } else if (data.irs || data.khs) {
      semesterColors.set(
        data.semester,
        "bg-blue-300 hover:bg-blue-400 cursor-pointer"
      );
    }
  });

  // Generate semester divs
  return (
    <>
      {Array.from({ length: SEMESTER_TOTAL }, (_, index) => {
        // TODO: access
        const semesterNumber = index + 1;
        const bgColor =
          semesterColors.get(semesterNumber) ||
          "bg-red-600 hover:bg-red-700 cursor-not-allowed"; // Default color: red
        const currentSemesterData = semestersData.find(
          (data) => data.semester === semesterNumber
        );
        const isNoData =
          !currentSemesterData?.irs &&
          !currentSemesterData?.khs &&
          !currentSemesterData?.pkl &&
          !currentSemesterData?.skripsi;

        return (
          <div key={index}>
            {isNoData ? (
              <div
                className={`mt-10 flex items-center justify-center mx-auto ${bgColor} w-28 h-16 text-white rounded-md`}
              >
                <h1 className="text-3xl">{semesterNumber}</h1>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className={`mt-10 flex items-center justify-center mx-auto ${bgColor} w-28 h-16 text-white rounded-md`}
                  >
                    <h1 className="text-3xl">{semesterNumber}</h1>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Semester {semesterNumber}</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="irs" className="w-[400px]">
                    <TabsList>
                      {currentSemesterData?.irs && (
                        <TabsTrigger value="irs">IRS</TabsTrigger>
                      )}
                      {currentSemesterData?.khs && (
                        <TabsTrigger value="khs">KHS</TabsTrigger>
                      )}
                      {currentSemesterData?.pkl && (
                        <TabsTrigger value="pkl">PKL</TabsTrigger>
                      )}
                      {currentSemesterData?.skripsi && (
                        <TabsTrigger value="skripsi">Skripsi</TabsTrigger>
                      )}
                    </TabsList>
                    {currentSemesterData?.irs && (
                      <TabsContent value="irs">
                        <p>
                          SKS Diambil : {currentSemesterData.irs.sks_diambil}
                        </p>
                        <p>
                          Status :{" "}
                          {mapStatusVerifikasiToNumber(
                            currentSemesterData.irs.status_verifikasi_id
                          )}
                        </p>
                        <a
                          target="_blank"
                          href={getFileUrl(currentSemesterData.irs.scan_irs)}
                        >
                          <button className="w-32 mt-5 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                            Lihat IRS
                          </button>
                              {" "}
                        </a>
                      </TabsContent>
                    )}
                    {currentSemesterData?.khs && (
                      <TabsContent value="khs">
                        <p>
                          SKS Semester : {currentSemesterData.khs.sks_semester}
                        </p>
                        <p>
                          SKS Kumulatif :{" "}
                          {currentSemesterData.khs.sks_kumulatif}
                        </p>
                        <p>
                          IP Semester : {currentSemesterData.khs.ip_semester}
                        </p>
                        <p>
                          IP Kumulatif : {currentSemesterData.khs.ip_kumulatif}
                        </p>
                        <p>
                          Status :{" "}
                          {mapStatusVerifikasiToNumber(
                            currentSemesterData.khs.status_verifikasi_id
                          )}
                        </p>
                        <a
                          target="_blank"
                          href={getFileUrl(currentSemesterData.khs.scan_khs)}
                        >
                          <button className="w-32 mt-5 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                            Lihat KHS
                          </button>
                              {" "}
                        </a>
                      </TabsContent>
                    )}
                    {currentSemesterData?.pkl && (
                      <TabsContent value="pkl">
                        <p>
                          Tanggal PKL :{" "}
                          {formatDateToIndonesian(
                            currentSemesterData.pkl.waktu_pkl
                          )}
                        </p>
                        {/* <p>
                          Dosen Pembimbing :{" "}
                          {currentSemesterData.pkl.dosen.nama}
                        </p> */}
                        <p>Nilai PKL : {currentSemesterData.pkl.nilai_pkl}</p>
                        <p>
                          Status :{" "}
                          {mapStatusVerifikasiToNumber(
                            currentSemesterData.pkl.status_verifikasi_id
                          )}
                        </p>

                        <a
                          target="_blank"
                          href={getFileUrl(currentSemesterData.pkl.scan_pkl)}
                        >
                          <button className="w-32 mt-5 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                            Lihat Scan PKL
                          </button>
                              {" "}
                        </a>
                      </TabsContent>
                    )}
                    {currentSemesterData?.skripsi && (
                      <TabsContent value="skripsi">
                        {/* <p>
                          Dosen Pembimbing :{" "}
                          {currentSemesterData.skripsi.dosen.nama}
                        </p> */}
                        <p>
                          Tanggal Sidang :{" "}
                          {formatDateToIndonesian(
                            currentSemesterData.skripsi.tgl_sidang
                          )}
                        </p>
                        <p>
                          Nilai Skripsi :{" "}
                          {currentSemesterData.skripsi.nilai_skripsi}
                        </p>
                        <p>
                          Status :{" "}
                          {mapStatusVerifikasiToNumber(
                            currentSemesterData.skripsi.status_verifikasi_id
                          )}
                        </p>
                        <a
                          target="_blank"
                          href={getFileUrl(
                            currentSemesterData.skripsi.scan_skripsi
                          )}
                        >
                          <button className="w-32 mt-5 h-10 bg-white hover:bg-pink-200 text-pink-400 border border-pink-400 font-semibold rounded">
                            Scan Skripsi
                          </button>
                              {" "}
                        </a>
                      </TabsContent>
                    )}
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ProgressSemesters;
