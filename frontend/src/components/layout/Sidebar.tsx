export default function Sidebar() {
  return (
    <aside
      className="flex w-60 flex-col border-r border-[#e0e0e0] bg-white"
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <nav aria-label="Sidebar" className="flex flex-1 flex-col gap-1 p-4">
        <a
          href="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-[#333333] transition-colors hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
        >
          Home
        </a>
      </nav>
    </aside>
  );
}
