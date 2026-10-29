import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
  wrapperClassName?: string;
};

export function PasswordInput({ className, wrapperClassName, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const label = visible ? "Hide password" : "Show password";

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("relative", wrapperClassName)}>
        <Input type={visible ? "text" : "password"} className={cn("pr-10", className)} {...props} />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={label}
              aria-pressed={visible}
              title={label}
              onClick={() => setVisible((v) => !v)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/70 hover:text-[#ffffff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-info)]"
            >
              {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
            </button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
