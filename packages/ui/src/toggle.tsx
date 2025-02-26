'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva } from 'class-variance-authority'

import { cn } from '@a/ui'

const toggleVariants = cva(
    "hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
      defaultVariants: {
        size: 'default',
        variant: 'default'
      },
      variants: {
        size: {
          default: 'h-9 min-w-9 px-2',
          lg: 'h-10 min-w-10 px-2.5',
          sm: 'h-8 min-w-8 px-1.5'
        },
        variant: {
          default: 'bg-transparent',
          outline:
            'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-xs'
        }
      }
    }
  ),
  Toggle = ({
    className,
    size,
    variant,
    ...props
  }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) => (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot='toggle'
      {...props}
    />
  )

export { Toggle, toggleVariants }
