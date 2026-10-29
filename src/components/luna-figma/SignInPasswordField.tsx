import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { figmaFieldProps } from "./useFigmaScreenData";
import { FigmaFieldError, figmaFieldA11y, useFigmaFieldErrors } from "./figmaFieldErrors";

/** Figma 998:1148 password row with show/hide toggle on the existing eye chrome. */
export function SignInPasswordField() {
  const figmaErrors = useFigmaFieldErrors();
  const [visible, setVisible] = useState(false);
  const toggleLabel = visible ? "Hide password" : "Show password";

  return (
    <div
      className="box-border self-stretch min-w-0 h-[52px] shrink-0 rounded-full relative border-[rgba(200,164,126,0.05)] border-[1px]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <input
        data-figma-node="998:1148"
        name="password"
        data-figma-field="password"
        data-figma-field-origin="design_text"
        data-figma-api-field="password"
        {...figmaFieldProps("password")}
        aria-required="true"
        {...figmaFieldA11y(figmaErrors, "password")}
        type={visible ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Password"
        aria-label="Password"
        className="absolute inset-0 h-full w-full appearance-none bg-transparent shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-current border-0 text-success placeholder:text-[rgba(255,255,255,0.6)] font-almarai text-[14px] font-[400] leading-[16px] text-left truncate min-w-0 pl-[20px] pr-[52px]"
      />
      <FigmaFieldError errors={figmaErrors} field="password" />
      <button
        type="button"
        data-figma-node="998:1156"
        aria-label={toggleLabel}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-[6px] top-1/2 z-[1] box-border flex h-[40px] w-[40px] shrink-0 -translate-y-1/2 cursor-pointer flex-row items-center justify-center rounded-[500px] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {visible ? (
          <EyeOff className="h-6 w-6 text-[#828282]" aria-hidden="true" />
        ) : (
          <svg
            data-figma-node="998:1159"
            viewBox="0 0 20 16"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="h-4 w-5 overflow-visible pointer-events-none"
          >
            <path
              d="M7.75 8C7.75 7.40326 7.98705 6.83097 8.40901 6.40901C8.83097 5.98705 9.40326 5.75 10 5.75C10.5967 5.75 11.169 5.98705 11.591 6.40901C12.0129 6.83097 12.25 7.40326 12.25 8C12.25 8.59674 12.0129 9.16903 11.591 9.59099C11.169 10.0129 10.5967 10.25 10 10.25C9.40326 10.25 8.83097 10.0129 8.40901 9.59099C7.98705 9.16903 7.75 8.59674 7.75 8Z"
              fill="#828282"
            />
            <path
              d="M0 8C0 9.64 0.425 10.191 1.275 11.296C2.972 13.5 5.818 16 10 16C14.182 16 17.028 13.5 18.725 11.296C19.575 10.192 20 9.639 20 8C20 6.36 19.575 5.809 18.725 4.704C17.028 2.5 14.182 0 10 0C5.818 0 2.972 2.5 1.275 4.704C0.425 5.81 0 6.361 0 8ZM10 4.25C9.00544 4.25 8.05161 4.64509 7.34835 5.34835C6.64509 6.05161 6.25 7.00544 6.25 8C6.25 8.99456 6.64509 9.94839 7.34835 10.6517C8.05161 11.3549 9.00544 11.75 10 11.75C10.9946 11.75 11.9484 11.3549 12.6517 10.6517C13.3549 9.94839 13.75 8.99456 13.75 8C13.75 7.00544 13.3549 6.05161 12.6517 5.34835C11.9484 4.64509 10.9946 4.25 10 4.25Z"
              fill="#828282"
              fillRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
