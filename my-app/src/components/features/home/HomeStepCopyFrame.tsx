import type { ReactNode } from 'react';

export interface HomeStepCopyFrameProps {
  step: string;
  heading: ReactNode;
  body: string;
}

/** Shared Frame 2147227812 copy column used by step sections. */
export function HomeStepCopyFrame({ step, heading, body }: HomeStepCopyFrameProps) {
  return (
    <div
      className="flex min-w-0 flex-[0.38] flex-col gap-5"
      data-figma-node="Frame 2147227812"
    >
      <span className="home-frame-2147227812__badge inline-flex w-fit items-center rounded-[100px] border border-[#c8a47e]/50 px-[16px] py-[6px]">
        {step}
      </span>
      <h3 className="home-frame-2147227812__heading">{heading}</h3>
      <p className="home-frame-2147227812__body">{body}</p>
    </div>
  );
}
