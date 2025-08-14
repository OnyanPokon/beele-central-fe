export default function getInitials(name) {
  if (!name || typeof name !== 'string') return '';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .map((word) => word[0].toLowerCase())
    .join('');
}
