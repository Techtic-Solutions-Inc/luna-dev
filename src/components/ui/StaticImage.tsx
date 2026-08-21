interface StaticImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function StaticImage({ src, alt, className, width, height }: StaticImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
}
