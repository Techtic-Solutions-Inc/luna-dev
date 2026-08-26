interface AuthCollageProps {
  src: string;
  alt: string;
}

export function AuthCollage({ src, alt }: AuthCollageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="hidden h-full min-h-screen w-full object-cover object-right lg:block"
    />
  );
}
