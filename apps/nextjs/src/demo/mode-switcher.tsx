'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@a/ui/button'

export const ModeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme(),
    toggleTheme = React.useCallback(
      () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      [resolvedTheme, setTheme]
    )

  return (
    <Button className='group/toggle h-8 w-8 px-0' onClick={toggleTheme} variant='ghost'>
      <SunIcon className='hidden [html.dark_&]:block' />
      <MoonIcon className='hidden [html.light_&]:block' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
