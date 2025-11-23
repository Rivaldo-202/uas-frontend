import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getActivityById, getActivities } from '../../frontend/services/api';

interface Activity {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  location: string;
  schedule?: string;
}

export default function DetailActivity() {
  const router = useRouter();
  const { id } = router.query;

  const [activity, setActivity] = useState<Activity | null>(null);
  const [relatedActivities, setRelatedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchActivity();
  }, [id]);

  const fetchActivity = async () => {
    try {
      const [activityRes, allActivitiesRes] = await Promise.all([
        getActivityById(id as string),
        getActivities()
      ]);

      setActivity(activityRes.data.data);
      setRelatedActivities(
        allActivitiesRes.data.data
          .filter((a: Activity) => a._id !== id)
          .slice(0, 3)
      );
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  // 🔹 Jika data tidak ditemukan
  if (!activity) {
    return (
      <div className="container py-5 text-center">
        <h3>Kegiatan tidak ditemukan</h3>
        <Link href="/activities" className="btn btn-primary mt-3">
          Kembali ke Kegiatan
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
        ← Kembali
      </button>

      {/* Header Activity */}
      <div className="card shadow-sm mb-4">
        <img
          src={activity.image}
          className="card-img-top"
          alt={activity.title}
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h2 className="card-title">{activity.title}</h2>
          <p className="card-text">{activity.description}</p>
          <p>{activity.content}</p>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Informasi Tambahan</div>
        <div className="card-body">
          <p><strong>Lokasi:</strong> {activity.location}</p>
          {activity.schedule && (
            <p><strong>Jadwal:</strong> {activity.schedule}</p>
          )}
          <p><strong>Kontak:</strong> @lbutarumanagara</p>
        </div>
      </div>

      {/* Related Activities */}
      <h4 className="fw-bold mb-3">Kegiatan Lainnya</h4>
      <div className="row">
        {relatedActivities.map(item => (
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
                alt={item.title}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted small">
                  {item.description}
                </p>
                <Link
                  href={`/activities/${item._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Join */}
      <div className="card bg-primary text-white mt-5 p-4 text-center">
        <h4 className="fw-bold">Tertarik Bergabung?</h4>
        <p>Daftar sekarang dan jadilah bagian dari UKM LBUT!</p>
        <Link href="/register" className="btn btn-light">
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
