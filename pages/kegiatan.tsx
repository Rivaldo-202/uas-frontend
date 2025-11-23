import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActivities } from '../frontend/services/api';

interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function Kegiatan() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchActivities();
  }, [selectedCategory]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await getActivities(selectedCategory);
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '3rem 0' }}>
        <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 className="display-5 fw-bold mb-2">Kegiatan Kami</h1>
          <p className="fs-5">Program latihan, turnamen, dan sparring yang rutin kami jalankan.</p>
        </div>
      </div>

      <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div className="mb-4">
          <button 
            className="btn me-2"
            style={{ 
              backgroundColor: selectedCategory === '' ? '#FDE047' : '#E5E7EB', 
              border: 'none', 
              fontWeight: 'bold' 
            }}
            onClick={() => setSelectedCategory('')}
          >
            Semua
          </button>
          <button 
            className="btn me-2"
            style={{ 
              backgroundColor: selectedCategory === 'turnamen' ? '#FDE047' : '#E5E7EB', 
              border: 'none', 
              fontWeight: 'bold' 
            }}
            onClick={() => setSelectedCategory('turnamen')}
          >
            Turnamen
          </button>
          <button 
            className="btn"
            style={{ 
              backgroundColor: selectedCategory === 'latihan' ? '#FDE047' : '#E5E7EB', 
              border: 'none', 
              fontWeight: 'bold' 
            }}
            onClick={() => setSelectedCategory('latihan')}
          >
            Latihan
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {activities.map((activity) => (
              <div key={activity._id} className="col-md-6">
                <div className="card h-100 border shadow-sm">
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
        )}
      </div>
    </div>
  );
}