interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-color-103 px-[20px] text-ink">
      <h1 className="font-garamond text-[40px] font-medium">{title}</h1>
    </main>
  );
}
