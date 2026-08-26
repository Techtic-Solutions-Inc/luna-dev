interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11161c] px-[20px] text-white">
      <h1 className="font-garamond text-[40px] font-medium">{title}</h1>
    </main>
  );
}
