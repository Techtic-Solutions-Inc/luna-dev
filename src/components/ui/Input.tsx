import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="flex flex-col gap-gap-8" htmlFor={inputId}>
      <span className="typo-caption-4 text-color-15">{label}</span>
      <input
        id={inputId}
        className={`rounded-radius-12 border border-color-26 bg-color-89 px-padding-16 py-padding-12 typo-body-15 text-secondary placeholder:text-color-15 hover:border-color-15 focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:border-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </label>
  );
}
