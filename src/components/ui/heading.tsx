import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-serif tracking-[-0.01em]", {
  variants: {
    variant: {
      hero: "text-[36px] font-medium leading-[46px] text-primary sm:text-[42px] sm:leading-[54px]",
      section:
        "text-[36px] font-medium leading-[44px] text-text-on-light sm:text-[48px] sm:leading-[58px]",
      sectionDark:
        "text-[36px] font-medium leading-[44px] text-primary sm:text-[48px] sm:leading-[58px]",
      champagne: "text-accent",
      subsection:
        "text-[28px] font-medium leading-[36px] text-primary sm:text-[32px] sm:leading-[40px]",
    },
  },
  defaultVariants: {
    variant: "hero",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, as: Tag = "h2", ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(headingVariants({ variant }), className)}
      {...props}
    />
  ),
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
