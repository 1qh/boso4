import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@a/ui'

const badgeVariants = cva(
    'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-auto rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
    {
      defaultVariants: {
        variant: 'default'
      },
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
          destructive:
            'bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border-transparent text-white',
          outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
          secondary:
            'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent'
        }
      }
    }
  ),
  Badge = ({
    asChild = false,
    className,
    variant,
    ...props
  }: React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & { readonly asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp className={cn(badgeVariants({ variant }), className)} data-slot='badge' {...props} />
    )
  }

export { Badge, badgeVariants }
