"use client";

import { useState, FormEvent } from "react";
import { createRegistration } from "../frontend/services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nim: "",
    fakultas: "",
    whatsapp: "",
    alasanBergabung: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await createRegistration(formData);
      setMessage(response.data.message);

      setFormData({
        namaLengkap: "",
        nim: "",
        fakultas: "",
        whatsapp: "",
        alasanBergabung: "",
      });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div
        style={{ backgroundColor: "#6366F1", color: "white", padding: "3rem 0" }}
      >
        <div
          className="container-fluid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <h1 className="display-5 fw-bold mb-2">Formulir Pendaftaran Anggota</h1>
          <p className="fs-5">
            Isi data diri kamu untuk bergabung bersama UKM LBUT Universitas Tarumanagara.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="container-fluid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="mb-5">
          {/* NAMA */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nama Lengkap</label>
            <input
              type="text"
              name="namaLengkap"
              className="form-control"
              value={formData.namaLengkap}
              onChange={handleChange}
              required
            />
          </div>

          {/* NIM */}
          <div className="mb-3">
            <label className="form-label fw-semibold">NIM</label>
            <input
              type="text"
              name="nim"
              className="form-control"
              value={formData.nim}
              onChange={handleChange}
              required
            />
          </div>

          {/* FAKULTAS */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Fakultas</label>
            <input
              type="text"
              name="fakultas"
              className="form-control"
              value={formData.fakultas}
              onChange={handleChange}
              required
            />
          </div>

          {/* WHATSAPP */}
          <div className="mb-3">
            <label className="form-label fw-semibold">No. Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              className="form-control"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          {/* ALASAN */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Alasan Bergabung</label>
            <textarea
              name="alasanBergabung"
              className="form-control"
              rows={4}
              value={formData.alasanBergabung}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn text-dark fw-bold"
            style={{ backgroundColor: "#FDE047", border: "none" }}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Formulir"}
          </button>
        </form>

        {/* INFO */}
        <div className="p-4 rounded border shadow-sm bg-light">
          <h5 className="fw-bold mb-2">Info Pendaftaran</h5>
          <p className="mb-0">Lokasi Latihan: GOR Kampus 1 & 2</p>
          <p className="mb-0">Jadwal: Senin & Kamis</p>
          <p className="mb-0">Kontak: @lbutarumanagara</p>
        </div>
      </div>
    </div>
  );
}
