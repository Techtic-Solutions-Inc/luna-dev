const Header: React.FC = () => (
  <header
    style={{
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      borderBottom: '1px solid var(--color-24)',
      backgroundColor: 'var(--color-secondary)',
    }}
  >
    <h1
      style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: '24px',
        fontWeight: 500,
        margin: 0,
      }}
    >
      Sofia
    </h1>
  </header>
);

export default Header;
