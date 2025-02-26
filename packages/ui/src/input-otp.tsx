'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'

import { cn } from '@a/ui'

const InputOTP = ({
    className,
    containerClassName,
    ...props
  }: React.ComponentProps<typeof OTPInput> & {
    readonly containerClassName?: string
  }) => (
    <OTPInput
      className={cn('disabled:cursor-not-allowed', className)}
      containerClassName={cn('flex items-center gap-2 has-disabled:opacity-50', containerClassName)}
      data-slot='input-otp'
      {...props}
    />
  ),
  InputOTPGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex items-center', className)} data-slot='input-otp-group' {...props} />
  ),
  InputOTPSlot = ({
    className,
    index,
    ...props
  }: React.ComponentProps<'div'> & {
    readonly index: number
  }) => {
    const inputOTPContext = React.useContext(OTPInputContext),
      { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {}

    return (
      <div
        className={cn(
          'border-input data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
          className
        )}
        data-active={isActive}
        data-slot='input-otp-slot'
        {...props}>
        {char}
        {hasFakeCaret ? (
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
          </div>
        ) : null}
      </div>
    )
  },
  InputOTPSeparator = ({ ...props }: React.ComponentProps<'div'>) => (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  )

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
