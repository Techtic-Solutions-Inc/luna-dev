import { LuCalendarDays, LuSparkles } from 'react-icons/lu';

interface Callout {
  title: string;
  body: string;
  icon: typeof LuCalendarDays;
  positionClasses: string;
}

const callouts: Callout[] = [
  {
    title: "This Week's Content Calendar",
    body: 'See what’s on deck to be published this week and how your social posts are performing.',
    icon: LuCalendarDays,
    positionClasses: 'desktop:absolute desktop:-top-32 desktop:right-75 desktop:w-[214px]',
  },
  {
    title: 'Agentwise Ultimate Mind',
    body: 'Agentwise Ultimate Mind is your strategic advisor and business partner customized for your business - not just a generic chatbot.',
    icon: LuSparkles,
    positionClasses: 'desktop:absolute desktop:top-303 desktop:right-20 desktop:w-[214px]',
  },
];

/** Skeleton of the signed-in dashboard, used purely as hero art. */
function DashboardArtwork() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[405px] overflow-hidden rounded-16 border border-color-41 bg-color-23 shadow-drop-shadow-20"
    >
      <div className="hidden w-[96px] shrink-0 flex-col gap-16 border-r border-color-41 bg-color-16 p-12 tablet:flex">
        <div className="mx-auto h-9 w-60 rounded-full bg-color-53" />
        <div className="flex flex-col gap-6">
          <div className="h-13 rounded-4 bg-color-36" />
          <div className="h-13 rounded-4 bg-color-95" />
          <div className="h-13 rounded-4 bg-color-95" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-13 rounded-4 bg-color-95" />
          <div className="h-13 rounded-4 bg-color-95" />
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <div className="h-24 rounded-6 border border-color-41" />
          <div className="h-13 rounded-4 bg-color-95" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-16 p-16">
        <div className="h-20 w-[190px] rounded-4 bg-color-53" />
        <div className="flex flex-col gap-6">
          <div className="h-8 w-full rounded-4 bg-color-95" />
          <div className="h-8 w-[70%] rounded-4 bg-color-95" />
        </div>
        <div className="h-32 rounded-full border border-color-41 bg-color-22" />
        <div className="flex gap-8">
          <div className="h-24 w-102 rounded-full bg-accent/80" />
          <div className="h-24 w-102 rounded-full bg-color-41" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-4 gap-8">
          <div className="rounded-8 bg-[linear-gradient(160deg,#473e33,#1a1919)]" />
          <div className="rounded-8 bg-[linear-gradient(160deg,#2f271f,#0e0d0d)]" />
          <div className="rounded-8 bg-[linear-gradient(160deg,#44413e,#191919)]" />
          <div className="rounded-8 bg-[linear-gradient(160deg,#3a3541,#141010)]" />
        </div>
      </div>
    </div>
  );
}

/** Hero artwork plus the two product callouts that overlap it in the design. */
export function HeroPreview() {
  return (
    <div className="relative">
      <DashboardArtwork />

      {callouts.map((callout) => (
        <div
          key={callout.title}
          className={`mt-16 rounded-12 bg-color-50 p-16 shadow-drop-shadow-19 desktop:mt-0 ${callout.positionClasses}`}
        >
          <div className="flex items-center gap-8">
            <span className="inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-color-26 text-accent">
              <callout.icon aria-hidden="true" size={13} />
            </span>
            <h2 className="type-caption-58 font-bold text-white">{callout.title}</h2>
          </div>
          <p className="type-caption-58 mt-8 text-white/70">{callout.body}</p>
        </div>
      ))}
    </div>
  );
}

export default HeroPreview;
