import { ULTIMATE_MIND_INTRO_COPY } from './constants';

interface UltimateMindIntroCopyProps {
  headingId?: string;
}

/** Shared Ultimate Mind heading and intro body copy. */
export function UltimateMindIntroCopy({ headingId }: UltimateMindIntroCopyProps) {
  return (
    <>
      <h2 id={headingId} className="home-ultimate-mind__heading">
        {ULTIMATE_MIND_INTRO_COPY.heading}
      </h2>
      <p className="home-ultimate-mind__body mt-[16px] max-w-[560px]">{ULTIMATE_MIND_INTRO_COPY.body}</p>
    </>
  );
}
