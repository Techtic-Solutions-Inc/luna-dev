/** luna-spec-codegen: owned-layout */
import { useState, type FormEvent } from "react";

interface WaitlistFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  marketing: string;
  message: string;
}

const initialForm: WaitlistFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  experience: "",
  marketing: "",
  message: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function FigmaSection_n_2729_13112() {
  const [form, setForm] = useState<WaitlistFormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof WaitlistFormState, string>>>({});
  const [submitMessage, setSubmitMessage] = useState("");

  function validate(values: WaitlistFormState): Partial<Record<keyof WaitlistFormState, string>> {
    const errors: Partial<Record<keyof WaitlistFormState, string>> = {};
    if (!values.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (values.phone.trim() && !/^\+?[0-9][0-9\s\-().]{6,24}$/.test(values.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }
    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitMessage("Fix the highlighted fields and try again.");
      return;
    }
    setSubmitMessage("Thank you. Your waitlist request was recorded locally.");
    setForm(initialForm);
  }

  return (
    <section data-figma-node="2729:13112" id="contact" className="absolute box-border left-[210px] top-[5737px] w-[1500px] h-[802px] flex flex-row items-center gap-5 z-[10]">
      <img data-figma-node="3701:13295" src="/assets/figma/3701-13295.png" alt="Frame 1618873431 1" className="box-border w-[740px] h-[802px] max-w-none object-cover object-top" />
      <div data-figma-node="2729:13115" className="box-border w-[740px] h-[802px] overflow-hidden rounded-[20px] relative gap-[30px] pt-[50px] pr-[50px] pb-[50px] pl-[50px]" style={{backgroundColor: "rgba(255, 255, 255, 0.04)"}}>
        <img data-figma-node="3361:5722" src="/assets/figma/3361-5722.png" alt="Group 33654447" className="box-border w-[430px] h-[984px] absolute left-[160px] top-[-73px] max-w-none object-cover object-top" />
        <div data-figma-node="2729:13116" className="box-border w-[640px] h-[203px] absolute left-[50px] top-[50px] gap-5">
          <img data-figma-node="2729:13117" src="/assets/figma/2729-13117.png" alt="Agentwise+Branding+(9) 1" className="box-border w-[79px] h-[79px] absolute left-[280px] top-[0px] max-w-none object-cover object-top" />
          <p data-figma-node="2729:13118" className="box-border w-[625px] h-[104px] absolute left-[8px] top-[99px] font-eb-garamond text-[80px] font-[400] leading-[104px] text-center whitespace-nowrap text-[#ffffff]">Let’s Work Together</p>
        </div>
        <form data-figma-node="2729:13119" className="box-border w-[640px] h-[389px] absolute left-[50px] top-[283px] gap-5" onSubmit={handleSubmit} noValidate>
          <div data-figma-node="2729:13120" className="box-border w-[640px] h-[52px] absolute left-[0px] top-[0px] gap-4">
            <div data-figma-node="2729:13121" className="box-border w-[312px] h-[52px] absolute left-[0px] top-[0px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="2729:13127" type="text" name="firstName" placeholder="First Name" aria-label="First Name" aria-invalid={fieldErrors.firstName ? true : undefined} value={form.firstName} onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))} className="box-border w-[272px] h-[16px] absolute left-[20px] top-[18px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            </div>
            <div data-figma-node="2729:13137" className="box-border w-[312px] h-[52px] absolute left-[328px] top-[0px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="2729:13143" type="text" name="lastName" placeholder="Last Name" aria-label="Last Name" aria-invalid={fieldErrors.lastName ? true : undefined} value={form.lastName} onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))} className="box-border w-[272px] h-[16px] absolute left-[20px] top-[18px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              <div data-figma-node="2729:13144" className="box-border w-[40px] h-[40px] absolute left-[1px] top-[6px]"></div>
            </div>
          </div>
          <div data-figma-node="2729:13153" className="box-border w-[640px] h-[52px] absolute left-[0px] top-[72px] gap-4">
            <div data-figma-node="2729:13154" className="box-border w-[312px] h-[52px] absolute left-[0px] top-[0px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="2729:13160" type="email" name="email" placeholder="Email" aria-label="Email" aria-invalid={fieldErrors.email ? true : undefined} value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="box-border w-[272px] h-[16px] absolute left-[20px] top-[18px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              <div data-figma-node="2729:13161" className="box-border w-[40px] h-[40px] absolute left-[329px] top-[6px]"></div>
            </div>
            <div data-figma-node="2729:13170" className="box-border w-[312px] h-[52px] absolute left-[328px] top-[0px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="2729:13176" type="tel" name="phone" placeholder="Phone number" aria-label="Phone number" aria-invalid={fieldErrors.phone ? true : undefined} value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="box-border w-[272px] h-[16px] absolute left-[20px] top-[18px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              <div data-figma-node="2729:13177" className="box-border w-[40px] h-[40px] absolute left-[1px] top-[6px]"></div>
            </div>
          </div>
          <div data-figma-node="2729:13187" className="box-border w-[640px] h-[54px] absolute left-[0px] top-[144px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="2729:13193" type="text" name="experience" placeholder="How long have you been in Real Estate?" aria-label="How long have you been in Real Estate?" value={form.experience} onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))} className="box-border w-[600px] h-[16px] absolute left-[20px] top-[19px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            <div data-figma-node="2729:13194" className="box-border w-[40px] h-[40px] absolute left-[657px] top-[-137px]"></div>
          </div>
          <div data-figma-node="2729:13204" className="box-border w-[640px] h-[54px] absolute left-[0px] top-[218px] overflow-hidden rounded-full pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="2729:13210" type="text" name="marketing" placeholder="What do you currently do for marketing your business?" aria-label="What do you currently do for marketing your business?" value={form.marketing} onChange={(e) => setForm((prev) => ({ ...prev, marketing: e.target.value }))} className="box-border w-[600px] h-[16px] absolute left-[20px] top-[19px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            <div data-figma-node="2729:13211" className="box-border w-[40px] h-[40px] absolute left-[657px] top-[-211px]"></div>
          </div>
          <div data-figma-node="2729:13220" className="box-border w-[640px] h-[97px] absolute left-[0px] top-[292px] overflow-hidden rounded-[10px] pt-[20px] pr-[20px] pb-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <textarea data-figma-node="2729:13226" name="message" placeholder="Your Message" aria-label="Your Message" value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} className="box-border w-[600px] h-[16px] absolute left-[20px] top-[20px] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            <div data-figma-node="2729:13227" className="box-border w-[40px] h-[40px] absolute left-[657px] top-[-263px]"></div>
          </div>
          <button data-figma-node="2738:13270" type="submit" className="box-border w-[202px] h-[50px] absolute left-[269px] top-[702px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90" style={{backgroundColor: "rgba(200, 164, 126, 0.3)"}}><span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Join the waitlist now</span></button>
        </form>
        <div className="sr-only" role="status" aria-live="polite">
          {fieldErrors.firstName}
          {fieldErrors.lastName}
          {fieldErrors.email}
          {fieldErrors.phone}
          {submitMessage}
        </div>
      </div>
    </section>
  );
}
