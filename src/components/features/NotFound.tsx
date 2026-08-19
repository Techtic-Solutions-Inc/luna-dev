import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090909] px-6 text-center font-['Almarai'] text-white">
      <section>
        <p className="font-['EB_Garamond'] text-7xl text-[#c8a47e]">404</p>
        <h1 className="mt-4 font-['EB_Garamond'] text-3xl">
          This page is not here.
        </h1>
        <p className="mt-3 text-sm text-[#bdbdbd]">
          Return to your Agentwise workspace to continue.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-[#c8a47e] px-5 py-3 text-sm font-semibold text-[#14100d]"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
