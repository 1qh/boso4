'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@a/ui'

const HoverCard = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) => (
    <HoverCardPrimitive.Root data-slot='hover-card' {...props} />
  ),
  HoverCardTrigger = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) => (
    <HoverCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
  ),
  HoverCardContent = ({
    align = 'center',
    className,
    sideOffset = 4,
    ...props
  }: React.ComponentProps<typeof HoverCardPrimitive.Content>) => (
    <HoverCardPrimitive.Content
      align={align}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-hidden',
        className
      )}
      data-slot='hover-card-content'
      sideOffset={sideOffset}
      {...props}
    />
  )

export { HoverCard, HoverCardContent, HoverCardTrigger }
