export const WEEK_CARDS = [
  {
    id: "mon",
    day: "MON",
    date: "MAY, 01",
    kind: "Reels",
    overlay: "[address + times]",
    src: "/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png",
  },
  {
    id: "tue",
    day: "TUE",
    date: "MAY, 02",
    kind: "Reels",
    overlay: "Doing showings in [insert neighborhood and city]!",
    src: "/assets/figma/frame-2147227806-4543-3507.png",
  },
  {
    id: "wed",
    day: "WED",
    date: "MAY, 03",
    kind: "Story",
    overlay: "here's what I'm working on today",
    src: "/assets/figma/frame-2147227751-1660-2184.png",
  },
  {
    id: "thu",
    day: "THU",
    date: "MAY, 04",
    kind: "Email",
    overlay: "*slams laptop shut til monday",
    src: "/assets/figma/group-33654428-2264-10401.png",
  },
  {
    id: "fri",
    day: "FRI",
    date: "MAY, 05",
    kind: "Story",
    overlay: "here's what I'm working on today",
    src: "/assets/figma/frame-1618873431-2729-13112.png",
  },
] as const;

export interface ContentCardProps {
  day: string;
  kind: string;
  overlay?: string;
  src: string;
  title?: string;
}

export function ContentCard({ day, kind, overlay, src, title }: ContentCardProps) {
  return (
    <article className="relative h-[300px] w-[200px] shrink-0 overflow-hidden rounded-8 border border-color-111 bg-color-133 p-16 text-almarai-14 text-secondary">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
