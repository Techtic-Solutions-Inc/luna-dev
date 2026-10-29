/**
 * Radix Select wrapper for future profile/toolbar fields (not used on Figma-native selects yet).
 */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type FigmaSelectFieldProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  "aria-label"?: string;
  className?: string;
};

export function FigmaSelectField({
  value,
  onValueChange,
  placeholder,
  options,
  "aria-label": ariaLabel,
  className,
}: FigmaSelectFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={ariaLabel} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
