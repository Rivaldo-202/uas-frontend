import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActivities, getNews } from '../frontend/services/api';

interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface News {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
}

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, newsRes] = await Promise.all([
          getActivities(),
          getNews()
        ]);
        setActivities(activitiesRes.data.data.slice(0, 3));
        setNews(newsRes.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '4rem 0' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 className="display-4 fw-bold mb-3">Wadah Bagi Atlet Atlet Muda UNTAR</h1>
          <p className="fs-5">
            UKM LBUT merupakan wadah bagi mahasiswa Universitas Tarumanagara untuk 
            mengembangkan bakat dan prestasi di bidang bulutangkis.
          </p>
        </div>
      </div>

      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 className="fw-bold mb-4">Kegiatan</h2>
        <div className="row g-4">
          {activities.map(activity => (
            <div key={activity._id} className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <img 
                  src={activity.image} 
                  className="card-img-top" 
                  alt={activity.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{activity.title}</h5>
                  <p className="card-text">{activity.description}</p>
                  <Link 
                    href={`/detail/${activity._id}`}
                    className="btn text-dark fw-bold"
                    style={{ backgroundColor: '#FDE047', border: 'none' }}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="fw-bold mb-4 mt-5">Berita</h2>
        <div className="row g-4">
          {news.map(item => (
            <div key={item._id} className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <img 
                  src={item.image} 
                  className="card-img-top" 
                  alt={item.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">{item.excerpt}</p>
                  <Link 
                    href={`/berita-detail/${item._id}`}
                    className="btn text-dark fw-bold"
                    style={{ backgroundColor: '#FDE047', border: 'none' }}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '3rem 0', marginTop: '3rem' }}>
        <div className="container-fluid text-center" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="fw-bold mb-4">Sudah Siap Bergabung dan Berlatih Bersama Kami?</h2>
          <Link 
            href="/register"
            className="btn text-dark fw-bold"
            style={{ backgroundColor: '#FDE047', border: 'none', padding: '0.75rem 2rem', fontSize: '1.1rem' }}
          >
            Daftar sekarang
          </Link>
        </div>
      </div>
    </>
  );
}