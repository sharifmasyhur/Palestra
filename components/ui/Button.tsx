import { cx } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light";

const base =
  "inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest2 px-[30px] py-[15px] rounded-sm border transition-all duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-ivory border-transparent hover:bg-terracotta-dark hover:-translate-y-px",
  secondary:
    "bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-ivory",
  "ghost-light":
    "bg-transparent text-ivory border-stone hover:border-ivory hover:bg-white/[0.08]",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps & { href: string; onClick?: () => void };

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", children, className, ...rest } = props;
  const classes = cx(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
