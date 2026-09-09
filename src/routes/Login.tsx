import { LoginForm } from '@/components/features/LoginForm';
import { signupHeadingClass, signupBodyClass } from './signup-styles';
import './signup-page.css';

const Login = () => (
  <div className="signup-page relative flex min-h-full w-full overflow-hidden">
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="signup-page__glow-purple absolute left-[10%] top-[20%] h-[480px] w-[480px] rounded-full opacity-30" />
      <div className="signup-page__glow-tan absolute bottom-[10%] right-[15%] h-[400px] w-[400px] rounded-full opacity-25" />
    </div>

    <div className="relative hidden flex-col justify-center gap-[24px] px-[32px] py-[40px] lg:flex lg:w-[55%]">
      <img
        src="/images/agentwise-logo.png"
        alt="Agentwise"
        className="h-[50px] w-[150px] object-contain object-left"
      />
      <h2 className={`max-w-[420px] ${signupHeadingClass}`}>Welcome back to Agentwise.</h2>
      <p className={`max-w-[380px] ${signupBodyClass}`}>
        Sign in to access your content library, marketing dashboard, and personalized AI advisor.
      </p>
    </div>

    <div className="relative flex w-full min-w-0 items-center justify-center px-[32px] py-[40px] lg:w-[45%] lg:max-w-[45%] lg:shrink-0">
      <div className="signup-page__form-shell">
        <div className="mb-[24px] text-center lg:text-left">
          <h1 className={signupHeadingClass}>Log in</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
