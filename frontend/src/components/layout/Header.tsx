export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e0e0e0] bg-white px-6" role="banner">
      <div className="font-['EB_Garamond'] text-xl font-semibold text-[#000000]">
        App
      </div>
      <nav aria-label="Main navigation" className="flex items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f2f2] text-sm text-[#333333] transition-colors hover:bg-[#e0e0e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
          aria-label="User menu"
        >
          U
        </button>
      </nav>
    </header>
  );
}
