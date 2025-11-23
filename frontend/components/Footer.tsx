import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#4F46E5', color: 'white', padding: '1.5rem 0', marginTop: 'auto' }}>
      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">© 2025 UKM LBUT Universitas Tarumanagara</p>
          </div>
          <div className="col-md-6 text-md-end">
            <span className="me-3">@lbutarumanagara</span>
            <Link href="/kontak" className="text-white text-decoration-none">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;