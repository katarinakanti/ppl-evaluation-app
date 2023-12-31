"use client";

import { MahasiswaWithRelations } from "@/data/mahasiswa";
import { Provinsi } from "@/data/provinsi";
import { Kota } from "@/data/kota";

import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { updateMhs } from "./form-submit";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type UserFormProps = {
  session: Session;
  mahasiswaData: MahasiswaWithRelations;
  provData: Provinsi[];
};

export default function UserForm({
  session,
  mahasiswaData,
  provData,
}: UserFormProps) {
  const router = useRouter();
  const [kotaList, setKotaList] = useState<Kota[]>([]);
  const [selectedKota, setSelectedKota] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "success" | "failed" | "loading"
  >("idle");
  const supabase = createClientComponentClient();

  const getKotaList = async (provId: string) => {
    const { data, error } = await supabase
      .from("kota")
      .select("*")
      .eq("provinsi_id", provId);

    if (error) {
      console.log(error);
      return;
    }
    setKotaList(data as Kota[]);
  };

  useEffect(() => {
    if (mahasiswaData.kota && mahasiswaData.kota_id) {
      getKotaList(String(mahasiswaData.kota.provinsi_id));
      setSelectedKota(String(mahasiswaData.kota_id));
    }
  }, [mahasiswaData]);

  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(updateMhs, initialState);
  // const { pending } = useFormStatus();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setStatus("loading");
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    updateMhs({}, formData)
      .then((res) => {
        if (res && res.errors) {
          console.log(res.errors);
          setStatus("failed");
          return;
        }
        return supabase.auth.refreshSession();
      })
      .then((res) => {
        if (res && res.error) {
          console.log(res.error);
          setStatus("failed");
          return;
        }
        console.log(res);
        setStatus("success");
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="flex flex-col items-center ml-10">
        <div className="text-left font-arial font-medium">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="w-56">NIM</th>
                <td>{session.user.user_metadata.no_induk}</td>
              </tr>
              <tr>
                <th>Nama Lengkap</th>
                <td>
                  {/* {session.user.user_metadata.nama} */}
                  <p>{mahasiswaData.nama}</p>
                </td>
              </tr>
              <tr>
                <th>Angkatan</th>
                <td>{mahasiswaData!.angkatan}</td>
              </tr>
              <tr>
                <th>Jalur Masuk</th>
                <td>
                  <select
                    className="p-2 border border-gray-300 bg-white"
                    name="jalur_masuk_id"
                    id="Status"
                    defaultValue={mahasiswaData.jalur_masuk_id}
                    required
                  >
                    <option>Pilih Jalur Masuk</option>
                    <option value="1">SBUB</option>
                    <option value="2">SNMPTN</option>
                    <option value="3">SBMPTN</option>
                    <option value="4">UM</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Nomor HP</th>
                <td>
                  <input
                    className="p-2 border border-gray-300 bg-white"
                    type="tel"
                    placeholder="Nomor Telepon"
                    name="no_hp"
                    defaultValue={mahasiswaData.no_hp}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input
                    className="p-2 border border-gray-300 bg-white"
                    type="text"
                    placeholder="Email Pribadi"
                    name="email"
                    defaultValue={mahasiswaData.email}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Alamat Asal</th>
                <td>
                  <input
                    className="p-2 border border-gray-300 bg-white"
                    type="text"
                    placeholder="Alamat Asal"
                    name="alamat"
                    defaultValue={mahasiswaData.alamat}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Provinsi</th>
                <td>
                  <select
                    className="p-2 border border-gray-300 bg-white"
                    name="provinsi_id"
                    id="provinsi"
                    onChange={(e) => getKotaList(e.target.value)}
                    defaultValue={
                      mahasiswaData.kota
                        ? String(mahasiswaData.kota.provinsi_id)
                        : ""
                    }
                    required
                  >
                    {provData && (
                      <>
                        <option>Pilih Provinsi</option>
                        {provData.map((prov) => (
                          <option key={prov.id} value={prov.id}>
                            {prov.nama}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Kab/Kota</th>
                <td>
                  <select
                    className="p-2 border border-gray-300 bg-white"
                    name="kota_id"
                    id="kota"
                    value={selectedKota ?? ""}
                    onChange={(e) => setSelectedKota(e.target.value)}
                    required
                  >
                    {kotaList && (
                      <>
                        <option>Pilih Kota</option>
                        {kotaList.map((kota) => (
                          <option key={kota.id} value={kota.id}>
                            {kota.nama}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-10 justify-end  mb-10">
        <button
          disabled={status === "loading"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
          disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {status === "loading" ? "Loading..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
