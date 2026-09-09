import { SignupForm } from '@/components/features/SignupForm';
import {
  signupHeadingClass,
  signupBodyClass,
  signupCardTitleClass,
  signupCardBodyClass,
} from './signup-styles';
import './signup-page.css';

const Signup = () => (
  <div className="signup-page relative flex min-h-full w-full overflow-hidden">
    {/* Radial glow / gradient atmosphere */}
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="signup-page__glow-purple absolute left-[10%] top-[20%] h-[480px] w-[480px] rounded-full opacity-30" />
      <div className="signup-page__glow-tan absolute bottom-[10%] right-[15%] h-[400px] w-[400px] rounded-full opacity-25" />
      <div className="signup-page__glow-coral absolute right-[30%] top-[5%] h-[320px] w-[320px] rounded-full opacity-20" />
    </div>

    {/* Left column — 55% split, decorative content */}
    <div className="relative hidden flex-col justify-center gap-[24px] px-[32px] py-[40px] lg:flex lg:w-[55%]">
      <img
        src="/vite.svg"
        alt="Agentwise"
        className="h-[50px] w-[150px] object-contain object-left"
      />
      <h2 className={`max-w-[420px] ${signupHeadingClass}`}>
        Built To Close The Gap Between Realtor And Social Media Influencer.
      </h2>
      <p className={`max-w-[380px] ${signupBodyClass}`}>
        Join Agentwise and get access to a full-scale professional content library — thousands
        of studio-produced real estate content at the tips of your fingers.
      </p>
      <div className="mt-[8px] grid max-w-[420px] grid-cols-2 gap-[16px]">
        <div className="signup-page__card rounded-[10px] border p-[16px] backdrop-blur-sm">
          <p className={signupCardTitleClass}>Less Time Marketing</p>
          <p className={`mt-[8px] ${signupCardBodyClass}`}>
            Outsource marketing by 90% while closing more deals.
          </p>
        </div>
        <div className="signup-page__card rounded-[10px] border p-[16px] backdrop-blur-sm">
          <p className={signupCardTitleClass}>Content Library</p>
          <p className={`mt-[8px] ${signupCardBodyClass}`}>
            Studio-produced real estate content ready to share.
          </p>
        </div>
      </div>
    </div>

    {/* Right form column — 45% split, fixed narrow width */}
    <div className="relative flex w-full min-w-0 items-center justify-center px-[32px] py-[40px] lg:w-[45%] lg:max-w-[45%] lg:shrink-0">
      <div className="signup-page__form-shell">
        <div className="mb-[24px] text-center lg:text-left">
          <h1 className={signupHeadingClass}>Sign Up</h1>
        </div>
        <SignupForm />
      </div>
    </div>
  </div>
);

export default Signup;
