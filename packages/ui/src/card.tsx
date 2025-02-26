import * as React from 'react'

import { cn } from '@a/ui'

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      data-slot='card'
      {...props}
    />
  ),
  CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-1.5 px-6', className)}
      data-slot='card-header'
      {...props}
    />
  ),
  CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('leading-none font-semibold', className)}
      data-slot='card-title'
      {...props}
    />
  ),
  CardDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='card-description'
      {...props}
    />
  ),
  CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('px-6', className)} data-slot='card-content' {...props} />
  ),
  CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex items-center px-6', className)} data-slot='card-footer' {...props} />
  )

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
