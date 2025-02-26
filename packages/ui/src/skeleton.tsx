import { cn } from '@a/ui'

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    className={cn('bg-primary/10 animate-pulse rounded-md', className)}
    data-slot='skeleton'
    {...props}
  />
)

export { Skeleton }
