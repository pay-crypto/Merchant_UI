import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-pulse bg-slate-200 rounded-lg', className)}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';

export { Skeleton };
