export function AuthImageGrid() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full min-h-[850px] w-full gap-[3px] bg-[#000001]"
    >
      <div className="flex w-1/2 flex-col gap-[3px]">
        <img
          src="/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png"
          alt=""
          className="h-[190px] w-full object-cover"
          loading="lazy"
        />
        <img
          src="/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png"
          alt=""
          className="min-h-[240px] flex-1 w-full object-cover"
          loading="lazy"
        />
        <img
          src="/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png"
          alt=""
          className="h-[210px] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-[3px]">
        <img
          src="/assets/figma/frame-1618873431-2729-13112.png"
          alt=""
          className="min-h-[400px] flex-1 w-full object-cover object-top"
          loading="lazy"
        />
        <img
          src="/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png"
          alt=""
          className="min-h-[280px] flex-1 w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
