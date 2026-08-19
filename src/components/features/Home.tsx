const Home: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: "'EB Garamond', serif",
    }}
  >
    <h1 style={{ fontSize: '42px', fontWeight: 500, marginBottom: '12px' }}>Sofia</h1>
    <p style={{ fontSize: '16px', color: '#959595', fontFamily: "'Almarai', sans-serif" }}>
      Welcome to the platform
    </p>
  </div>
);

export default Home;
