import Image from '@/components/ui/image';

export default function AuthMarketingCollage() {
  return (
    <aside
      className="relative hidden min-h-screen w-[46%] overflow-hidden tablet:block"
      aria-hidden="true"
    >
      <Image
        src="/assets/figma/forgot-password-collage.png"
        alt=""
        width={1318}
        height={1700}
        className="absolute inset-0 h-full w-full object-cover object-left"
      />
    </aside>
  );
}
