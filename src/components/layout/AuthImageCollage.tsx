const collageItems = [
  {
    className: 'col-span-1 row-span-1 bg-[#2a2520]',
    label: 'Workspace',
    quote: '',
  },
  {
    className: 'col-span-1 row-span-2 bg-[#3d3530]',
    label: 'Portrait',
    quote: "Who You're Working With Matters.",
  },
  {
    className: 'col-span-1 row-span-1 bg-[#252018]',
    label: 'Coffee',
    quote: "There's less buyer competition right now.",
  },
  {
    className: 'col-span-1 row-span-1 bg-[#1e1a16]',
    label: 'Kitchen',
    quote: '',
  },
  {
    className: 'col-span-1 row-span-2 bg-[#353028]',
    label: 'Bedroom',
    quote: "Everyone's waiting to buy 'until the market is right...'",
  },
];

const AuthImageCollage = () => (
  <div className="grid h-full min-h-screen grid-cols-2 grid-rows-3 gap-1 bg-black p-1">
    {collageItems.map((item) => (
      <div
        key={item.label}
        className={`relative overflow-hidden ${item.className}`}
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      >
        {item.quote && (
          <p className="absolute bottom-4 left-4 right-4 font-garamond text-lg leading-snug text-white">
            {item.quote}
          </p>
        )}
      </div>
    ))}
  </div>
);

export default AuthImageCollage;
