import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getNews } from '../frontend/services/api';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
}

export default function Berita() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      setNews(response.data.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div>
      <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '3rem 0' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 className="display-5 fw-bold mb-2">Berita & Pengumuman</h1>
          <p className="fs-5">Update kegiatan, prestasi, dan pengumuman penting LBUT.</p>
        </div>
      </div>

      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {news.map((item) => (
                <div key={item._id} className="card mb-4 border-0 shadow">
                  <img 
                    src={item.image} 
                    className="card-img-top" 
                    alt={item.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <h3 className="card-title fw-bold mb-3">{item.title}</h3>
                    <p className="text-muted mb-3">
                      {formatDate(item.publishedAt)} — oleh {item.author}
                    </p>
                    <p className="card-text">{item.excerpt}</p>
                    <Link 
                      href={`/berita-detail/${item._id}`}
                      className="btn text-dark fw-bold"
                      style={{ backgroundColor: '#FDE047', border: 'none' }}
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow" style={{ backgroundColor: '#E5E7EB' }}>
                <div className="card-body">
                  <h4 className="fw-bold mb-3">Berita Terbaru</h4>
                  <ul className="list-unstyled">
                    {news.slice(0, 3).map((item) => (
                      <li key={item._id} className="mb-3">
                        <Link 
                          href={`/berita-detail/${item._id}`}
                          className="text-decoration-none text-dark fw-bold"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <h5 className="fw-bold mt-4 mb-3">Ikuti Kami:</h5>
                  <p className="mb-2">@lbutarumanagara</p>
                  <p className="mb-2"><strong>Kontak:</strong> lbutarumanagara@untar.ac.id</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}