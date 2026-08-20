interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  error,
  disabled = false,
}: CheckboxProps) => (
  <div>
    <div className="flex items-start gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        aria-invalid={Boolean(error)}
      />
      <label htmlFor={id} className="text-sm leading-snug text-color-93">
        {label}
      </label>
    </div>
    {error ? (
      <p className="mt-1 text-xs text-color-45" role="alert">
        {error}
      </p>
    ) : null}
  </div>
);

export default Checkbox;
