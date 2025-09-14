import { cn } from '@/lib/utils';
import { LoaderCircleIcon } from 'lucide-react';

export function ContentLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center grow w-full', className)}
    >
      <div className="flex items-center gap-2.5">
        <LoaderCircleIcon className="animate-spin text-mutedForeground opacity-50" />
        <span className="text-mutedForeground font-medium text-sm">
          Loading...
        </span>
      </div>
    </div>
  );
}
