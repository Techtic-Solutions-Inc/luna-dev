interface EmailDesignLayoutProps {
  children: React.ReactNode;
}

const EmailDesignLayout = ({ children }: EmailDesignLayoutProps) => (
  <div className="min-h-screen bg-[#0d0d0d] px-4 py-8">
    <main className="mx-auto w-full max-w-[640px]">{children}</main>
  </div>
);

export default EmailDesignLayout;
