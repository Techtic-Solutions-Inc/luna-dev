import './AuthImageCollage.css';

const COLLAGE_ITEMS = [
  {
    id: 'workspace',
    className: 'auth-collage__item auth-collage__item--workspace',
    alt: 'Real estate professional working at a cafe',
  },
  {
    id: 'agent',
    className: 'auth-collage__item auth-collage__item--agent',
    alt: 'Real estate agent in an outdoor plaza',
    quote: 'Who You\u2019re Working With Matters.',
  },
  {
    id: 'coffee',
    className: 'auth-collage__item auth-collage__item--coffee',
    alt: 'Coffee and notebook on a table',
    quote:
      'There\u2019s less buyer competition right now. You\u2019re not fighting 10 other offers.',
  },
  {
    id: 'bedroom',
    className: 'auth-collage__item auth-collage__item--bedroom',
    alt: 'Modern bedroom interior',
    quote:
      'Everyone\u2019s waiting to buy \u2018until the market is right...\u2019 but here\u2019s why moving now could be the smarter move.',
  },
  {
    id: 'kitchen',
    className: 'auth-collage__item auth-collage__item--kitchen',
    alt: 'Styled kitchen shelf with mugs',
    quote: 'Rates change',
  },
] as const;

export function AuthImageCollage() {
  return (
    <aside className="auth-collage" aria-label="Marketing inspiration gallery">
      <div className="auth-collage__grid">
        {COLLAGE_ITEMS.map((item) => (
          <figure key={item.id} className={item.className}>
            <div className="auth-collage__image" role="img" aria-label={item.alt} />
            {'quote' in item && item.quote ? (
              <blockquote className="auth-collage__quote">{item.quote}</blockquote>
            ) : null}
          </figure>
        ))}
      </div>
    </aside>
  );
}

export default AuthImageCollage;
