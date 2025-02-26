import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@a/ui'

const alertVariants = cva(
    'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    {
      defaultVariants: {
        variant: 'default'
      },
      variants: {
        variant: {
          default: 'bg-background text-foreground',
          destructive:
            'text-destructive-foreground *:data-[slot=alert-description]:text-destructive-foreground/80 [&>svg]:text-current'
        }
      }
    }
  ),
  Alert = ({
    className,
    variant,
    ...props
  }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) => (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot='alert'
      role='alert'
      {...props}
    />
  ),
  AlertTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      data-slot='alert-title'
      {...props}
    />
  ),
  AlertDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      data-slot='alert-description'
      {...props}
    />
  )

export { Alert, AlertDescription, AlertTitle }
