"use client";

import { Session } from "@supabase/supabase-js";
import { Mahasiswa } from "@/data/mahasiswa";

type UserFormProps = {
  session: Session;
  userData: Mahasiswa;
};

export default function UserForm({ session, userData }: UserFormProps) {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th>NIM</th>
          <td>{session.user.user_metadata.no_induk}</td>
        </tr>
        <tr>
          <th>Nama Lengkap</th>
          <td>{session.user.user_metadata.nama}</td>
        </tr>
        <tr>
          <th>Angkatan</th>
          <td>{userData!.angkatan}</td>
        </tr>
        <tr>
          <th>Jalur Masuk</th>
          <td>
            <select
              className="p-2 border border-gray-300 bg-white"
              name="status"
              id="Status"
              defaultValue=""
            >
              <option>Pilih Jalur Masuk</option>
              <option value="belumPKL">SNMPTN</option>
              <option value="sedangPKL">SBMPTN</option>
              <option value="sudahPKL">Jalur Mandiri</option>
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
            />
          </td>
        </tr>
        <tr>
          <th>Kab/Kota</th>
          <td>
            <input
              className="p-2 border border-gray-300 bg-white"
              type="text"
              placeholder="Kabupaten/Kota"
            />
          </td>
        </tr>
        <tr>
          <th>Provinsi</th>
          <td>
            <input
              className="p-2 border border-gray-300 bg-white"
              type="text"
              placeholder="Provinsi"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
