const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

// Helper untuk GET
async function get(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', // penting untuk Next.js agar tidak cached
  });
  return res.json();
}

// Helper untuk POST
async function post(path: string, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// --------------------------
// Activities
// --------------------------
export const getActivities = (category?: string) => {
  const query = category ? `?category=${category}` : '';
  return get(`/activities${query}`);
};

export const getActivityById = (id: string) => {
  return get(`/activities/${id}`);
};

export const createActivity = (data: any) => {
  return post(`/activities`, data);
};

// --------------------------
// News
// --------------------------
export const getNews = () => {
  return get('/news');
};

export const getNewsById = (id: string) => {
  return get(`/news/${id}`);
};

export const createNews = (data: any) => {
  return post('/news', data);
};

// --------------------------
// Registrations
// --------------------------
export const createRegistration = (data: any) => {
  return post('/registrations', data);
};

export const getRegistrations = () => {
  return get('/registrations');
};

// --------------------------
// Contact
// --------------------------
export const createContact = (data: any) => {
  return post('/contacts', data);
};

export const getContacts = () => {
  return get('/contacts');
};
