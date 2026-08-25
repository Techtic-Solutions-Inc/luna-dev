export interface ContentCardProps {
  day: string;
  kind: string;
  overlay?: string;
  src?: string;
  title?: string;
}

export function ContentCard({ day, kind, overlay, src, title }: ContentCardProps) {
  return (
    <article className="relative h-[300px] w-[200px] shrink-0 overflow-hidden rounded-8 border border-color-111 bg-color-133 p-16 text-almarai-14 text-secondary">
      {src ? <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
      <div className="absolute inset-0 bg-color-16/30" />
      <div className="relative z-10 flex items-start justify-between text-nav-label uppercase">
        <span className="text-color-131">{day}</span>
        <span className="text-accent">{kind}</span>
      </div>
      <p className="relative z-10 mt-80 px-8 text-center font-garamond text-garamond-17">
        {title ?? overlay}
      </p>
    </article>
  );
}
