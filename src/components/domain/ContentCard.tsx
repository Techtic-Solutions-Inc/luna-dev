import Image from '@/components/ui/image';

interface ContentCardProps {
  title: string;
  image: string;
  caption?: string;
}

export default function ContentCard({ title, image, caption }: ContentCardProps) {
  return (
    <article className="relative h-[420px] w-[220px] shrink-0 overflow-hidden rounded-[28px] tablet:h-[520px] tablet:w-[260px]">
      <Image src={image} alt={title} className="h-full w-full object-cover" />
      {caption ? (
        <p className="absolute inset-x-4 top-1/3 text-center font-garamond text-lg leading-snug text-secondary">
          {caption}
        </p>
      ) : null}
    </article>
  );
}
