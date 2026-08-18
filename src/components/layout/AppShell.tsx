import { useState, type PropsWithChildren } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090909] font-['Almarai'] text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
