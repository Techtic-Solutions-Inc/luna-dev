import { Button } from '@/components/ui/Button';

export function UltimateMindSection() {
  return (
    <section className="home-steps-bg bg-color-103 px-[20px] pb-[125px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto grid max-w-[1760px] overflow-hidden rounded-[24px] lg:grid-cols-2">
        <div className="home-green-panel px-[24px] py-[30px] md:px-[30px]">
          <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
            Agentwise Ultimate Mind
          </h2>
          <p className="type-body-16 mt-[16px] max-w-[560px] text-ink">
            Your strategic advisor — trained on your business, your market, and your voice. Ask anything, map your
            growth plan, and get a second opinion 24/7 from a partner who actually knows your business.
          </p>
          <img
            src="/assets/figma/frame-2147227817-2270-14193.png"
            alt="Agentwise Ultimate Mind"
            className="mt-[24px] h-auto w-full rounded-[16px] object-contain"
          />
        </div>
        <div className="home-green-panel-aside flex flex-col gap-[20px] px-[24px] py-[30px] md:px-[30px] lg:justify-center">
          <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[48px]">
            Here’s The Deal... <span className="text-accent">Great Marketing</span> Is Just The Start.
          </h2>
          <p className="type-body-6 text-ink">
            A custom business dashboard and a personalized AI advisor built into every plan.
          </p>
          <Button to="#features" variant="primary" className="w-fit min-w-[160px]">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
