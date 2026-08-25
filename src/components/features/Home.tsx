import { Link } from 'react-router-dom';
import Header from '../layout/Header';

const Home = () => (
  <div className="min-h-screen bg-color-16">
    <Header />

    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, #3771c8 0%, #3771c8 13%, #6600ff00 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, #ffdd55 0%, #ffdd55 10%, #ff543e 50%, #c837ab 100%)',
          filter: 'blur(121px)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1920px] px-padding-24 py-padding-60 tablet:px-padding-40 desktop:px-padding-60 desktop:py-[120px]">
        <div className="grid items-center gap-gap-48 desktop:grid-cols-2 desktop:gap-gap-60">
          <div className="flex flex-col gap-gap-24">
            <h1 className="font-garamond text-[42px] font-medium leading-[54.81px] text-secondary tablet:text-[55px] tablet:leading-[71.77px] desktop:text-[60px] desktop:leading-[78.3px]">
              Built To Close The Gap Between Realtor And Social Media Influencer. No, You
              Don&apos;t Have To Be Both.
            </h1>
            <p className="max-w-xl font-almarai text-base leading-[28px] text-color-15">
              Agentwise is the all-in-one marketing platform built specifically for
              residential real estate agents. Get studio-quality content, captions, and
              calendars — without becoming a full-time content creator.
            </p>
            <div className="flex flex-wrap gap-gap-16">
              <Link
                to="/sign-up"
                className="inline-flex rounded-radius-10000 bg-accent px-padding-32 py-padding-14 font-public-sans text-base font-semibold text-color-16 transition-[filter] hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:brightness-75"
              >
                Get Started
              </Link>
              <Link
                to="/studio/overview"
                className="inline-flex rounded-radius-10000 border border-secondary px-padding-32 py-padding-14 font-public-sans text-base font-semibold text-secondary transition-colors hover:bg-color-20 active:bg-color-129"
              >
                Explore Studio
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-gap-16">
            <div className="grid grid-cols-2 gap-gap-16">
              <div className="rounded-radius-16 border border-color-129 bg-color-20 p-padding-20 backdrop-blur-[7px]">
                <p className="font-almarai text-sm font-bold leading-[18px] text-secondary">
                  Less Time Spent
                </p>
                <p className="mt-gap-8 font-almarai text-xs leading-[18px] text-color-15">
                  On content creation every week
                </p>
              </div>
              <div className="rounded-radius-16 border border-color-129 bg-color-20 p-padding-20 backdrop-blur-[7px]">
                <p className="font-almarai text-sm font-bold leading-[18px] text-secondary">
                  Full-Scale Professional
                </p>
                <p className="mt-gap-8 font-almarai text-xs leading-[18px] text-color-15">
                  Marketing without the agency price tag
                </p>
              </div>
            </div>
            <div className="rounded-radius-16 border border-color-129 bg-color-20 p-padding-24 backdrop-blur-[7px]">
              <p className="font-garamond text-[24px] font-medium leading-[31.32px] text-secondary">
                Built To Launch: Join The Waitlist Today
              </p>
              <p className="mt-gap-12 font-almarai text-sm leading-[22px] text-color-15">
                Spots claimed 72% · Remaining 28%
              </p>
              <div className="mt-gap-12 h-[4px] overflow-hidden rounded-radius-10000 bg-color-64">
                <div className="h-full w-[72%] rounded-radius-10000 bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-color-129 bg-black px-padding-24 py-padding-40 tablet:px-padding-40">
      <div className="mx-auto max-w-[1920px]">
        <img
          src="/images/home.png"
          alt="Agentwise platform overview showing marketing tools for real estate agents"
          className="mx-auto w-full max-w-[1200px] rounded-radius-16 shadow-drop-shadow-39"
        />
      </div>
    </section>
  </div>
);

export default Home;
