import { ULTIMATE_MIND_INTRO_COPY } from './constants';

interface UltimateMindIntroCopyProps {
  headingId?: string;
  heading?: string;
  body?: string;
}

/** Shared Ultimate Mind heading and intro body copy. */
export function UltimateMindIntroCopy({
  headingId,
  heading = ULTIMATE_MIND_INTRO_COPY.heading,
  body = ULTIMATE_MIND_INTRO_COPY.body,
}: UltimateMindIntroCopyProps) {
  return (
    <>
      <h2 id={headingId} className="home-ultimate-mind__heading">
        {heading}
      </h2>
      <p className="home-ultimate-mind__body mt-[16px] max-w-[560px]">{body}</p>
    </>
  );
}
