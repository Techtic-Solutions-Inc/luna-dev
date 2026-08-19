const NotFound: React.FC = () => (
  <div
    role="alert"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: "'Almarai', sans-serif",
    }}
  >
    <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>404</h1>
    <p style={{ fontSize: '16px', color: '#959595' }}>Page not found</p>
  </div>
);

export default NotFound;
