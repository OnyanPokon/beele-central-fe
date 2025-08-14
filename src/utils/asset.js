const baseUrl = import.meta.env.VITE_BASE_URL;

export default function asset(url) {
  return baseUrl + '/storage/' + url;
}
