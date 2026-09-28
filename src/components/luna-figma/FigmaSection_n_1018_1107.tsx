/** luna-spec-codegen: owned-layout */
import { type FormEvent, useState } from "react";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { getApiErrorMessage } from "@/lib/api-client";
import { isValidEmail } from "@/lib/validate-email";

export function FigmaSection_n_1018_1107() {
  const [email, setEmail] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const forgotPassword = useForgotPassword();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setLiveMessage("Email is required.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setLiveMessage("Please enter a valid email address.");
      return;
    }

    setLiveMessage("Submitting password reset request.");
    forgotPassword.mutate(
      { email: trimmed },
      {
        onSuccess: (response) => {
          setLiveMessage(
            response.message ||
              "If an account exists for this email, a reset link has been sent.",
          );
        },
        onError: (error) => {
          setLiveMessage(getApiErrorMessage(error));
        },
      },
    );
  }

  return (
    <section data-figma-node="1018:1107" className="absolute box-border left-[100px] top-[232px] w-[461px] h-[385px] pr-[114px] pl-[114px] flex flex-col items-center gap-[30px] z-[3]">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
        {forgotPassword.isPending ? " Submitting." : null}
      </div>
      <img data-figma-node="1018:1108" src="/assets/figma/1018-1108.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
      <p data-figma-node="1018:1221" className="box-border w-[232px] h-[50px] font-eb-garamond text-[38px] font-[500] leading-[50px] text-center whitespace-nowrap text-[#ffffff]">Reset Password</p>
      <p data-figma-node="1018:1279" className="box-border w-[461px] h-[56px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-center text-[#ffffff]">Enter the email address you used to create your account and we’ll send you a link to reset your password.</p>
      <form
        className="box-border flex w-[461px] flex-col items-center gap-[30px]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div data-figma-node="1018:1222" className="box-border w-[461px] h-[52px] relative gap-5">
          <div data-figma-node="1018:1223" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input
              data-figma-node="1018:1229"
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (liveMessage) {
                  setLiveMessage("");
                }
              }}
              placeholder="Email"
              aria-label="Email"
              aria-invalid={
                liveMessage.includes("valid") ||
                liveMessage.includes("required")
              }
              required
              className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
            />
          </div>
        </div>
        <button
          data-figma-node="1018:1259"
          type="submit"
          disabled={forgotPassword.isPending}
          className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:pointer-events-none"
          style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
        >
          <span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Send me a link</span>
        </button>
      </form>
    </section>
  );
}
