'use client'

import * as React from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@a/ui/input-otp'
import { Label } from '@a/ui/label'

export const InputOTPDemo = () => (
  <div className='flex flex-col flex-wrap gap-6 md:flex-row'>
    <InputOTPSimple />
    <InputOTPPattern />
    <InputOTPWithSeparator />
    <InputOTPWithSpacing />
  </div>
)

const InputOTPSimple = () => (
    <div className='grid gap-2'>
      <Label htmlFor='simple'>Simple</Label>
      <InputOTP id='simple' maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  InputOTPPattern = () => (
    <div className='grid gap-2'>
      <Label htmlFor='digits-only'>Digits Only</Label>
      <InputOTP id='digits-only' maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  InputOTPWithSeparator = () => {
    const [value, setValue] = React.useState('123456')

    return (
      <div className='grid gap-2'>
        <Label htmlFor='with-separator'>With Separator</Label>
        <InputOTP id='with-separator' maxLength={6} onChange={setValue} value={value}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    )
  },
  InputOTPWithSpacing = () => (
    <div className='grid gap-2'>
      <Label htmlFor='with-spacing'>With Spacing</Label>
      <InputOTP id='with-spacing' maxLength={6}>
        <InputOTPGroup className='gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border'>
          <InputOTPSlot aria-invalid='true' index={0} />
          <InputOTPSlot aria-invalid='true' index={1} />
          <InputOTPSlot aria-invalid='true' index={2} />
          <InputOTPSlot aria-invalid='true' index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
