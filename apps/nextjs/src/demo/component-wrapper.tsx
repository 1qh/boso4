'use client'

import * as React from 'react'

import { cn } from '@a/ui'

export const ComponentWrapper = ({
  children,
  className,
  name,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { readonly name: string }) => (
  <ComponentErrorBoundary name={name}>
    <div
      className={cn('flex w-full scroll-mt-16 flex-col rounded-lg border', className)}
      data-name={name.toLowerCase()}
      id={name}
      {...props}>
      <div className='border-b px-4 py-3'>
        <div className='text-sm font-medium'>{getComponentName(name)}</div>
      </div>
      <div className='flex flex-1 items-center gap-2 p-4'>{children}</div>
    </div>
  </ComponentErrorBoundary>
)

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-4 text-red-500'>Something went wrong in component: {this.props.name}</div>
      )
    }

    return this.props.children
  }
}

const getComponentName = (name: string) =>
  name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
