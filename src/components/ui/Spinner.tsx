import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  label?: string;
}

const Spinner = ({ className, label = 'Loading...' }: SpinnerProps) => (
  <div className={cn('flex items-center justify-center gap-2', className)} role="status" aria-busy="true">
    <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden="true" />
    <span className="font-almarai text-sm text-muted-foreground">{label}</span>
  </div>
);

export default Spinner;
