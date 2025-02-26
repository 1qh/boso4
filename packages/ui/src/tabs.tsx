'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@a/ui'

const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-2', className)}
      data-slot='tabs'
      {...props}
    />
  ),
  TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => (
    <TabsPrimitive.List
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1',
        className
      )}
      data-slot='tabs-list'
      {...props}
    />
  ),
  TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
      className={cn(
        "data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot='tabs-trigger'
      {...props}
    />
  ),
  TabsContent = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => (
    <TabsPrimitive.Content
      className={cn('flex-1 outline-none', className)}
      data-slot='tabs-content'
      {...props}
    />
  )

export { Tabs, TabsContent, TabsList, TabsTrigger }
