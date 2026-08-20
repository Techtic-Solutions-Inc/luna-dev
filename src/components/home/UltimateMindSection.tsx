import { LuSparkles } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export function UltimateMindSection() {
  return (
    <section
      aria-labelledby="ultimate-mind-heading"
      className="px-20 py-60 tablet:py-80 desktop:py-102"
    >
      <div className="mx-auto w-full max-w-[1164px]">
        <div className="overflow-hidden rounded-24 bg-color-67 desktop:flex">
          <div className="bg-color-64 p-32 desktop:w-1/2 desktop:p-52">
            <div className="flex items-center gap-12">
              <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-color-26 text-accent">
                <LuSparkles aria-hidden="true" size={16} />
              </span>
              <h2 id="ultimate-mind-heading" className="type-heading-lg-48 text-white">
                Agentwise Ultimate Mind
              </h2>
            </div>

            <p className="type-body-68 mt-16 text-white/70">
              Good morning, Ava. Your strategic AI advisor and business partner — customized for
              your business, not just a generic chatbot.
            </p>

            <div
              aria-hidden="true"
              className="mt-32 overflow-hidden rounded-16 border border-color-41/30 bg-color-23 shadow-drop-shadow-20"
            >
              <div className="flex h-[200px] flex-col gap-12 p-16 tablet:h-[240px]">
                <div className="h-12 w-[120px] rounded-4 bg-color-53" />
                <div className="flex flex-col gap-6">
                  <div className="h-8 w-full rounded-4 bg-color-95" />
                  <div className="h-8 w-[80%] rounded-4 bg-color-95" />
                  <div className="h-8 w-[60%] rounded-4 bg-color-95" />
                </div>
                <div className="mt-auto h-28 w-[100px] rounded-full bg-accent/60" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-32 desktop:w-1/2 desktop:p-52">
            <h3 className="type-heading-xl-63 text-white desktop:type-heading-xl-73">
              Here&apos;s The Deal... Great Marketing Is Just The Start.
            </h3>
            <p className="type-body-68 mt-20 text-white/80">
              Explore Ultimate Mind — your AI-powered strategic advisor that knows your market,
              understands your business, and helps you make smarter decisions every day.
            </p>
            <Link
              to="/sign-up"
              className="type-body-sm-2 mt-32 inline-flex h-36 w-fit items-center justify-center rounded-full bg-accent px-24 text-color-16 transition-colors duration-200 hover:bg-color-30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UltimateMindSection;
