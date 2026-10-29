/**
 * Luna generated layout
 * Figma node: 998:1033
 * Section: Welcome to Agentwise
 * Route: /sign-in
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import { figmaFieldProps, figmaActionProps, useFigmaFormSubmit, useFigmaScreenData } from "./useFigmaScreenData";
import { FigmaFieldError, figmaFieldA11y, useFigmaFieldErrors } from "./figmaFieldErrors";
import { SignInPasswordField } from "./SignInPasswordField";
export function SignInWelcomeToAgentwiseSection() {
  const figmaErrors = useFigmaFieldErrors();
  const onFormSubmit = useFigmaFormSubmit();
  const { submitting, readLoading } = useFigmaScreenData();
  const busy = submitting || readLoading;
  return (
    <section data-figma-node="998:1033" id="contact" aria-busy={busy} className={`relative box-border w-full md:w-[461px] max-w-full md:shrink-0 md:min-h-[545px] pr-[4px] pl-[4px] rounded-[16px] flex flex-col items-center gap-[30px] z-[3] ${busy ? "animate-pulse pointer-events-none opacity-70" : ""}`}>
      <img data-figma-node="1001:1195" src="/assets/figma/1001-1195.png" alt="" aria-hidden="true" width={164} height={55} decoding="async" onError={e => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} className="box-border w-[164px] h-[55px] shrink-0 max-w-none object-cover object-top" />
      <h1 data-figma-node="1001:1194" className="box-border w-max max-w-[min(355px,100%)] h-auto min-h-[50px] shrink-0 font-eb-garamond text-[38px] font-[500] leading-[50px] capitalize text-center lg:whitespace-nowrap text-success">Welcome to Agentwise</h1>
      <h2 data-figma-node="1018:1276" className="box-border w-max max-w-[min(457px,100%)] h-auto min-h-[28px] shrink-0 opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-center lg:whitespace-nowrap text-success">Everything you need to create standout real estate content.</h2>
      <form data-figma-node="998:1097" data-figma-form="true" onSubmit={onFormSubmit} className="box-border self-stretch min-w-0 h-auto shrink-0 relative flex flex-col items-start gap-5">
        <><input data-figma-node="998:1132" name="email" data-figma-field="email" data-figma-field-origin="design_text" data-figma-api-field="email" {...figmaFieldProps("email")} type="email" placeholder="Email" inputMode="email" autoComplete="email" aria-label="Email" aria-required="true" {...figmaFieldA11y(figmaErrors, "email")} className="box-border self-stretch min-w-0 h-[52px] shrink-0 rounded-full shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary border-[rgba(200,164,126,0.05)] border-[1px] pr-[20px] pl-[20px] text-success placeholder:text-[rgba(255,255,255,0.6)] aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-current" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}} /><FigmaFieldError errors={figmaErrors} field="email" /></>
        <SignInPasswordField />
        <div data-figma-node="1001:1033" className="box-border self-stretch min-w-0 h-auto shrink-0 relative flex flex-row items-center gap-2">
          <div className="box-border w-[20px] shrink-0 h-[20px] relative"><input data-figma-node="1001:1026" id="figma-ctl-1001-1026" name="checkbox" data-figma-field="checkbox" data-figma-field-origin="layer_metadata" {...figmaFieldProps("checkbox")} type="checkbox" className="absolute inset-0 h-full w-full appearance-none bg-transparent shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary peer cursor-pointer" /><div className="pointer-events-none absolute inset-0 peer-checked:brightness-200"><div data-figma-node="1001:1027" className="box-border w-[17px] h-[17px] absolute left-[2px] top-[2px] rounded-[4.17px] block"></div><div data-figma-node="1001:1028" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] block">
  <div data-figma-node="1001:1029" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] block">
    <svg data-figma-node="1001:1030" viewBox="0 0 17.92 17.92" preserveAspectRatio="none" aria-hidden="true" className="box-border absolute left-[5%] w-[90%] top-[5%] h-[90%] pointer-events-none overflow-visible"><path d="M11.4583 17.9167L6.45833 17.9167C1.93333 17.9167 0 15.9833 0 11.4583L0 6.45833C0 1.93333 1.93333 0 6.45833 0L11.4583 0C15.9833 0 17.9167 1.93333 17.9167 6.45833L17.9167 11.4583C17.9167 15.9833 15.9833 17.9167 11.4583 17.9167ZM6.45833 1.25C2.61667 1.25 1.25 2.61667 1.25 6.45833L1.25 11.4583C1.25 15.3 2.61667 16.6667 6.45833 16.6667L11.4583 16.6667C15.3 16.6667 16.6667 15.3 16.6667 11.4583L16.6667 6.45833C16.6667 2.61667 15.3 1.25 11.4583 1.25L6.45833 1.25Z" fill="#838383" /></svg>
  </div>
</div></div></div>
          <label data-figma-node="1001:1025" htmlFor="figma-ctl-1001-1026" className="box-border flex-1 min-w-0 h-auto min-h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-left truncate text-success cursor-pointer">Remember me</label>
          <a data-figma-node="1001:1034" href="/forgot-password" className="box-border w-max max-w-[min(143px,100%)] h-auto min-h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right truncate min-w-0 text-success no-underline hover:opacity-80">Forgot your password?</a>
        </div>
      </form>
      <button data-figma-node="998:1335" type="button" data-figma-action="act_90fcde8a6c8d" data-figma-submit="POST /api/auth/login" {...figmaActionProps("act_90fcde8a6c8d")} className="box-border self-stretch min-w-0 h-[52px] shrink-0 rounded-[10000px] pt-[10px] pr-[24px] pb-[10px] pl-[24px] inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-50" style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}><span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-success">Sign In</span></button>
      <div data-figma-node="1001:1035" className="box-border self-stretch min-w-0 h-[1px] shrink-0" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}} />
      <p data-figma-node="1001:1036" className="box-border self-stretch min-w-0 h-auto min-h-[16px] shrink-0 opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-center truncate text-success"><span className="text-success">Not a member yet? </span><span role="link" aria-disabled="true" data-figma-route-pending="true" title="Coming soon" className="text-info cursor-not-allowed">Sign up here.</span></p>
    </section>
  );
}
