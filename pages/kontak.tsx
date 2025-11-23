"use client";

import { useState, FormEvent } from "react";
import { createContact } from "../frontend/services/api";

export default function Kontak() {
  const [contactForm, setContactForm] = useState({
    nama: "",
    pesan: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await createContact(contactForm);
      setMessage(response.data.message);
      setContactForm({ nama: "", pesan: "" });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
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
          <h1 className="display-5 fw-bold mb-2">Kontak Kami</h1>
          <p className="fs-5">
            Butuh informasi lebih lanjut? Hubungi kami melalui kontak di bawah
            atau kunjungi latihan rutin kami.
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
        {/* Informasi Kontak */}
        <div className="mb-5">
          <h4 className="fw-bold">Alamat</h4>
          <p>Kampus 1 Universitas Tarumanagara, Jakarta Barat</p>

          <h4 className="fw-bold mt-3">Media Sosial</h4>
          <p>@lbutarumanagara</p>

          <h4 className="fw-bold mt-3">Email</h4>
          <p>lbutarumanagara@untar.ac.id</p>
        </div>

        {/* FORM */}
        <h3 className="fw-bold mb-3">Form Pesan</h3>

        {message && (
          <div className="alert alert-info">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label fw-semibold">Nama</label>
            <input
              type="text"
              name="nama"
              className="form-control"
              value={contactForm.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Pesan</label>
            <textarea
              name="pesan"
              className="form-control"
              rows={4}
              value={contactForm.pesan}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            className="btn text-dark fw-bold"
            type="submit"
            style={{ backgroundColor: "#FDE047", border: "none" }}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>

        {/* CARD INFO LATIHAN */}
        <div className="p-4 rounded border shadow-sm bg-light">
          <h5 className="fw-bold mb-2">Info Latihan</h5>
          <p className="mb-0">Lokasi: GOR Kampus 1 & 2</p>
          <p className="mb-0">Jadwal: Senin & Kamis</p>
          <p className="mb-0">Kontak: @lbutarumanagara</p>
        </div>
      </div>
    </div>
  );
}
