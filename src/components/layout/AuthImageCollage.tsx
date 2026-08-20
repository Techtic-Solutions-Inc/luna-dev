const collageItems = [
  {
    image: '/assets/figma/auth-collage-workspace.png',
    className: 'col-span-1 row-span-1',
    label: 'Workspace',
    quote: '',
  },
  {
    image: '/assets/figma/auth-collage-portrait.png',
    className: 'col-span-1 row-span-2',
    label: 'Portrait',
    quote: "Who You're Working With Matters.",
  },
  {
    image: '/assets/figma/auth-collage-coffee.png',
    className: 'col-span-1 row-span-1',
    label: 'Coffee',
    quote: "There's less buyer competition right now.",
  },
  {
    image: '/assets/figma/auth-collage-kitchen.png',
    className: 'col-span-1 row-span-1',
    label: 'Kitchen',
    quote: '',
  },
  {
    image: '/assets/figma/auth-collage-bedroom.png',
    className: 'col-span-1 row-span-1',
    label: 'Bedroom',
    quote: "Everyone's waiting to buy 'until the market is right...'",
  },
];

const AuthImageCollage = () => (
  <div className="grid h-full min-h-screen grid-cols-2 grid-rows-3 gap-1 bg-color-20 p-1">
    {collageItems.map((item) => (
      <div
        key={item.label}
        className={`relative overflow-hidden bg-color-63 ${item.className}`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%), url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {item.quote ? (
          <p className="absolute bottom-4 left-4 right-4 font-garamond text-lg leading-snug text-secondary">
            {item.quote}
          </p>
        ) : null}
      </div>
    ))}
  </div>
);

export default AuthImageCollage;
