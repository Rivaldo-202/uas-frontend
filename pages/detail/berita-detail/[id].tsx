import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getNewsById, getNews } from '../../services/api';

interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
}

export default function BeritaDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const [newsRes, allNewsRes] = await Promise.all([
        getNewsById(id as string),
        getNews()
      ]);

      setNews(newsRes.data.data);
      setRelatedNews(
        allNewsRes.data.data
          .filter((n: News) => n._id !== id)
          .slice(0, 3)
      );
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

  // Loading State
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  // Jika berita tidak ditemukan
  if (!news) {
    return (
      <div className="container py-5 text-center">
        <h3>Berita tidak ditemukan</h3>
        <Link href="/berita" className="btn btn-primary mt-3">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="btn btn-link text-decoration-none mb-3 p-0"
      >
        ← Kembali ke Berita
      </button>

      {/* Berita Detail */}
      <div className="card shadow-sm mb-4">
        <img
          src={news.image}
          alt={news.title}
          className="card-img-top"
          style={{ maxHeight: '420px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h2 className="card-title">{news.title}</h2>
          <p className="text-muted small mb-3">
            {formatDate(news.publishedAt)} — oleh {news.author}
          </p>

          <p className="card-text">{news.content}</p>
        </div>
      </div>

      {/* Related News */}
      <h4 className="fw-bold mb-3">Berita Terbaru</h4>
      <div className="row">
        {relatedNews.map(item => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="text-muted small">{formatDate(item.publishedAt)}</p>

                <Link
                  href={`/berita/${item._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
