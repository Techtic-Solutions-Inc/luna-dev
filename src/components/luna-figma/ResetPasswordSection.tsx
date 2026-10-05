/**
 * Luna generated layout
 * Figma node: 1018:1107
 * Section: Reset Password
 * Route: /forgot-your-password
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import {
  FigmaFieldError,
  useFigmaActionProps,
  useFigmaFieldProps,
} from "./useFigmaScreenData";
export function ResetPasswordSection() {
  const wrapProps = useFigmaFieldProps("wrap");
  const sendLinkAction = useFigmaActionProps("1018:1259");
  return (
    <section data-figma-node="1018:1107" className="absolute box-border left-[100px] top-[232px] w-[461px] h-[385px] [--fx:100] [--fww:461] pr-[114px] pl-[114px] flex flex-col items-center gap-[30px] z-[3]">
      <img data-figma-node="1018:1108" src="/assets/figma/1018-1108.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
      <p data-figma-node="1018:1221" className="box-border w-[232px] h-[50px] font-eb-garamond text-[38px] font-[500] leading-[49.59px] text-center whitespace-nowrap text-[#ffffff]">Reset Password</p>
      <p data-figma-node="1018:1279" className="box-border w-[461px] h-[56px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-center text-[#ffffff]">Enter the email address you used to create your account and we’ll send you a link to reset your password.</p>
      <div data-figma-node="1018:1222" className="box-border w-[461px] h-[52px] relative gap-5">
        <input data-figma-node="1018:1223" name="wrap" data-figma-field="wrap" data-figma-field-origin="layer_metadata" {...wrapProps} type="email" placeholder="Email" aria-label="Email" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] rounded-full shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-[rgba(200,164,126,0.05)] border-[1px] pr-[20px] pl-[20px] text-[#ffffff] placeholder:text-[rgba(255,255,255,0.6)]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}} />
        <FigmaFieldError field="wrap" />
      </div>
      <button data-figma-node="1018:1259" data-figma-action="1018:1259" type="button" className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 cursor-pointer" style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}} {...sendLinkAction}><span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Send me a link</span></button>
    </section>
  );
}
