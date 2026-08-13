import './AuthImageCollage.css';

export function AuthImageCollage() {
  return (
    <aside className="auth-collage" aria-label="Marketing inspiration gallery">
      <img
        className="auth-collage__image"
        src="/auth/collage.jpg"
        alt="Lifestyle and real estate marketing inspiration collage"
        width={1315}
        height={1700}
        decoding="async"
      />
    </aside>
  );
}

export default AuthImageCollage;
