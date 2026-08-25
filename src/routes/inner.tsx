import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface InnerPageProps {
  title: string;
  children?: ReactNode;
}

export function InnerPage({ title, children }: InnerPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="mx-auto flex w-full max-w-content flex-1 flex-col px-6 py-24 md:px-10">
        <h1 className="font-serif text-5xl text-white">{title}</h1>
        <div className="mt-6 max-w-2xl font-sans text-step-desc text-color-131">{children}</div>
        <Link to="/" className="btn-gold mt-10 w-fit text-color-107">
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
