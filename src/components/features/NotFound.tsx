import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
      <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: '30px', fontWeight: 500 }}>
        Page Not Found
      </h1>
      <Link to="/" style={{ color: 'var(--accent)', fontSize: '14px' }}>
        Back to Home
      </Link>
    </div>
  );
}
