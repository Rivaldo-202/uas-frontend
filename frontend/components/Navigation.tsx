import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4F46E5', padding: '1rem 0' }}>
      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Link href="/" className="navbar-brand text-white fw-bold fs-4">
          UKM LBUT
        </Link>
        <button 
          className="navbar-toggler bg-white" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link text-white ${router.pathname === '/' ? 'active' : ''}`}>
                Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/kegiatan" className={`nav-link text-white ${router.pathname === '/kegiatan' ? 'active' : ''}`}>
                Kegiatan
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/berita" className={`nav-link text-white ${router.pathname === '/berita' ? 'active' : ''}`}>
                Berita
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/tentang-kami" className={`nav-link text-white ${router.pathname === '/tentang-kami' ? 'active' : ''}`}>
                Tentang Kami
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/kontak" className={`nav-link text-white ${router.pathname === '/kontak' ? 'active' : ''}`}>
                Kontak
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/register"
                className="btn text-dark fw-bold ms-2"
                style={{ backgroundColor: '#FDE047', border: 'none', padding: '0.5rem 1.5rem' }}
              >
                Gabung sekarang
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;