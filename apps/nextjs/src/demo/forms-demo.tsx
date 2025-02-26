'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { Checkbox } from '@a/ui/checkbox'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'
import { RadioGroup, RadioGroupItem } from '@a/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'
import { Textarea } from '@a/ui/textarea'

const plans = [
    {
      description: 'Perfect for small businesses.',
      id: 'starter',
      name: 'Starter Plan',
      price: '$10'
    },
    {
      description: 'Advanced features with more storage.',
      id: 'pro',
      name: 'Pro Plan',
      price: '$20'
    }
  ] as const,
  themes = {
    amber: {
      dark: {
        '--primary': 'oklch(0.985 0.001 106.423)',
        '--primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--ring': 'oklch(0.553 0.013 58.071)'
      },
      light: {
        '--primary': 'oklch(0.769 0.188 70.08)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--ring': 'oklch(0.82 0.13 92.25)'
      }
    },
    blue: {
      dark: {
        '--primary': 'oklch(0.546 0.245 262.881)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--ring': 'oklch(0.379 0.146 265.522)'
      },
      light: {
        '--primary': 'oklch(0.546 0.245 262.881)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--ring': 'oklch(0.707 0.165 254.624)'
      }
    },
    stone: {
      dark: {
        '--accent': 'oklch(0.268 0.007 34.298)',
        '--accent-foreground': 'oklch(0.985 0.001 106.423)',
        '--primary': 'oklch(0.985 0.001 106.423)',
        '--primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--ring': 'oklch(0.553 0.013 58.071)'
      },
      light: {
        '--accent': 'oklch(0.97 0.001 106.424)',
        '--primary': 'oklch(0.216 0.006 56.043)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--ring': 'oklch(0.869 0.005 56.366)'
      }
    },
    teal: {
      dark: {
        '--primary': 'oklch(0.985 0.001 106.423)',
        '--primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--ring': 'oklch(0.553 0.013 58.071)'
      },
      light: {
        '--primary': 'oklch(0.627 0.194 149.214)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--ring': 'oklch(0.79 0.19 153.13)'
      }
    }
  } as const

export const FormsDemo = () => {
  const { theme: mode = 'light' } = useTheme(),
    [theme, setTheme] = React.useState<keyof typeof themes | undefined>(undefined),
    themeStyles = React.useMemo(() => {
      if (!theme) {
        return undefined
      }
      return themes[theme][mode as keyof (typeof themes)[typeof theme]]
    }, [theme, mode])

  return (
    <div className='flex max-w-md flex-col gap-4'>
      <Card style={themeStyles as React.CSSProperties}>
        <CardHeader>
          <CardTitle className='text-lg'>Upgrade your subscription</CardTitle>
          <CardDescription>
            You are currently on the free plan. Upgrade to the pro plan to get access to all
            features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-3'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Evil Rabbit' />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='example@acme.com' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='card-number'>Card Number</Label>
              <div className='grid grid-cols-[1fr_80px_60px] gap-3'>
                <Input id='card-number' placeholder='1234 1234 1234 1234' />
                <Input id='card-number-expiry' placeholder='MM/YY' />
                <Input id='card-number-cvc' placeholder='CVC' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='color'>Color</Label>
              <Select onValueChange={value => setTheme(value as keyof typeof themes)}>
                <SelectTrigger id='color'>
                  <SelectValue placeholder='Select a color' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(themes).map(theme => (
                    <SelectItem key={theme} value={theme}>
                      <div
                        className='size-3.5 rounded-full'
                        style={{
                          backgroundColor: themes[theme as keyof typeof themes].light['--primary']
                        }}
                      />
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <fieldset className='flex flex-col gap-3'>
              <legend className='text-sm font-medium'>Plan</legend>
              <p className='text-muted-foreground text-sm'>
                Select the plan that best fits your needs.
              </p>
              <RadioGroup className='grid grid-cols-2 gap-3' defaultValue='starter'>
                {plans.map(plan => (
                  <Label
                    className='has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-ring/10 flex items-start gap-3 rounded-lg border p-3'
                    key={plan.id}>
                    <RadioGroupItem
                      className='data-[state=checked]:border-primary'
                      id={plan.name}
                      value={plan.id}
                    />
                    <div className='grid gap-1 font-normal'>
                      <div className='font-medium'>{plan.name}</div>
                      <div className='text-muted-foreground text-xs leading-snug'>
                        {plan.description}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='notes'>Notes</Label>
              <Textarea id='notes' placeholder='Enter notes' />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <Checkbox id='terms' />
                <Label className='font-normal' htmlFor='terms'>
                  I agree to the terms and conditions
                </Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox defaultChecked id='newsletter' />
                <Label className='font-normal' htmlFor='newsletter'>
                  Allow us to send you emails
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button size='sm' variant='outline'>
            Cancel
          </Button>
          <Button size='sm'>Upgrade Plan</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
