'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@a/ui'

const ScrollBar = ({
    className,
    orientation = 'vertical',
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb
        className='bg-border relative flex-1 rounded-full'
        data-slot='scroll-area-thumb'
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
  ScrollArea = ({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) => (
    <ScrollAreaPrimitive.Root
      className={cn('relative', className)}
      data-slot='scroll-area'
      {...props}>
      <ScrollAreaPrimitive.Viewport
        className='ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1'
        data-slot='scroll-area-viewport'>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )

export { ScrollArea, ScrollBar }
