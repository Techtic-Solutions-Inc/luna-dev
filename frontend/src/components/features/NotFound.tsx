import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-['EB_Garamond'] text-6xl font-medium text-[#000000]">
          404
        </h1>
        <p className="text-base text-[#828282]">
          The page you are looking for does not exist.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg bg-[#c8a47e] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#b8946e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
