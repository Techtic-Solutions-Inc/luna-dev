import axios from 'axios';

/** Strip trailing /api so contract paths like /api/visitor/home never double-prefix. */
function normalizeApiBaseUrl(url: string | undefined): string {
  if (!url) return '';
  return url.replace(/\/+$/, '').replace(/\/api$/, '');
}

const apiClient = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
