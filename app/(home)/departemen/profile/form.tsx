"use client";

import { Provinsi } from "@/data/provinsi";
import { Kota } from "@/data/kota";

import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState, useEffect } from "react";

import { updateDepartemen } from "./form-submit";

import { DosenWithRelations } from "@/data/dosen";
import { useFormState } from "react-dom";
import { Button } from "@/components/Button";

type UserFormProps = {
  session: Session;
  data: DosenWithRelations;
  provData: Provinsi[];
};

export default function UserForm({ session, data, provData }: UserFormProps) {
  const [kotaList, setKotaList] = useState<Kota[]>([]);
  const [selectedKota, setSelectedKota] = useState<string | null>(null);
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
    if (data.kota && data.kota_id) {
      getKotaList(String(data.kota.provinsi_id));
      setSelectedKota(String(data.kota_id));
    }
  }, [data]);

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateDepartemen, initialState);

  return (
    <form action={dispatch}>
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
                  <p>{data.nama}</p>
                </td>
              </tr>
              <tr>
                <th>NIDN</th>
                <td>
                  <input
                    className="p-2 border border-gray-300 bg-white"
                    type="text"
                    placeholder="NIDN"
                    name="nidn"
                    defaultValue={data.nidn}
                    required
                  />
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
                    defaultValue={data.no_hp}
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
                    defaultValue={data.email}
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
                    defaultValue={data.alamat}
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
                      data.kota ? String(data.kota.provinsi_id) : ""
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
        <Button />
      </div>
    </form>
  );
}
