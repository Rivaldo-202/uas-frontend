export default function TentangKami() {
  return (
    <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 className="fw-bold mb-4">Tentang Kami</h1>
      
      <div className="row">
        <div className="col-lg-7">
          <div className="p-4 mb-4" style={{ backgroundColor: '#E5E7EB' }}>
            <p className="mb-3">
              UKM LBUT merupakan wadah bagi mahasiswa Universitas Tarumanagara untuk 
              mengembangkan bakat dan prestasi di bidang bulutangkis. Kami menjalankan
            </p>
            <p className="mb-0">
              latihan rutin, mengorganisir turnamen, dan menjalin sparring dengan kampus lain.
            </p>
          </div>

          <h3 className="fw-bold mb-3">Visi</h3>
          <div className="p-4 mb-4" style={{ backgroundColor: '#E5E7EB' }}>
            <p className="mb-0">
              Membentuk atlet bulutangkis yang kompetitif dan berkarakter di lingkungan kampus.
            </p>
          </div>

          <h3 className="fw-bold mb-3">Misi</h3>
          <div className="p-4" style={{ backgroundColor: '#E5E7EB' }}>
            <ul className="mb-0">
              <li className="mb-2">Menyelenggarakan program latihan berkala untuk meningkatkan kualitas atlet.</li>
              <li className="mb-2">Mengikuti kompetisi internal dan eksternal sebagai wadah pembelajaran.</li>
              <li className="mb-0">Membangun komunitas yang suportif antar anggota.</li>
            </ul>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="p-4" style={{ backgroundColor: '#E5E7EB' }}>
            <h3 className="fw-bold mb-3">Kegiatan LBUT</h3>
            <p className="mb-2"><strong>Struktur Organisasi</strong></p>
            <p className="mb-2">Ketua: Rivaldo Marcellino Patty</p>
            <p className="mb-2">Wakil: Rifqy Aris Widiantoro</p>
            <p className="mb-2">Sekretaris: Edgahrd Timothi Santeri</p>
            <p className="mb-0">Bendahara: Imam Ismail</p>
          </div>
        </div>
      </div>
    </div>
  );
}