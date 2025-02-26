'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@a/ui'

const Popover = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => (
    <PopoverPrimitive.Root data-slot='popover' {...props} />
  ),
  PopoverTrigger = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => (
    <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />
  ),
  PopoverContent = ({
    align = 'center',
    className,
    sideOffset = 4,
    ...props
  }: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden',
          className
        )}
        data-slot='popover-content'
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
  PopoverAnchor = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => (
    <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />
  )

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
