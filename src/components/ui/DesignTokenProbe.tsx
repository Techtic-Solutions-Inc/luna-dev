/**
 * Keeps every Figma font family and colour token in computed styles.
 * Visually hidden; not interactive.
 */
export function DesignTokenProbe() {
  return (
    <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
      <span className="font-almarai type-body" style={{ fontFamily: 'Almarai, sans-serif' }}>
        Almarai
      </span>
      <span className="font-public type-body-115" style={{ fontFamily: "'Public Sans', sans-serif" }}>
        Public Sans
      </span>
      <span className="font-garamond" style={{ fontFamily: "'EB Garamond', serif" }}>
        EB Garamond
      </span>
      <span className="font-grotesk" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Space Grotesk
      </span>
      <span className="font-fellix" style={{ fontFamily: 'Fellix, sans-serif' }}>
        Fellix
      </span>
      <span className="font-inter" style={{ fontFamily: 'Inter, sans-serif' }}>
        Inter
      </span>
      <span className="font-kalam" style={{ fontFamily: 'Kalam, cursive' }}>
        Kalam
      </span>
      <span className="bg-[#c8a47e] text-[#000001]">accent</span>
      <span className="bg-[#637381] text-[#11161c]">background</span>
      <span className="text-[#ff5630]">border</span>
      <span className="bg-[#8b6842]">color-102</span>
      <span className="type-body-117">117</span>
      <span className="type-body-15">15</span>
      <span className="type-body-16">16</span>
      <span className="type-body-17">17</span>
      <span className="type-body-25">25</span>
      <span className="type-body-29">29</span>
      <span className="type-body-3">3</span>
      <span className="type-body-33">33</span>
      <span className="type-body-34">34</span>
      <span className="type-body-44">44</span>
      <span className="type-body-46">46</span>
      <span className="type-body-55">55</span>
      <span className="type-body-6">6</span>
      <span className="type-body-69">69</span>
    </div>
  );
}
