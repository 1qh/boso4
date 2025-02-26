import { Label } from '@a/ui/label'
import { RadioGroup, RadioGroupItem } from '@a/ui/radio-group'

const plans = [
  {
    description: 'Perfect for small businesses getting started with our platform',
    id: 'starter',
    name: 'Starter Plan',
    price: '$10'
  },
  {
    description: 'Advanced features for growing businesses with higher demands',
    id: 'pro',
    name: 'Pro Plan',
    price: '$20'
  }
] as const

export const RadioGroupDemo = () => (
  <div className='flex flex-col gap-6'>
    <RadioGroup defaultValue='comfortable'>
      <div className='flex items-center gap-3'>
        <RadioGroupItem id='r1' value='default' />
        <Label htmlFor='r1'>Default</Label>
      </div>
      <div className='flex items-center gap-3'>
        <RadioGroupItem id='r2' value='comfortable' />
        <Label htmlFor='r2'>Comfortable</Label>
      </div>
      <div className='flex items-center gap-3'>
        <RadioGroupItem id='r3' value='compact' />
        <Label htmlFor='r3'>Compact</Label>
      </div>
    </RadioGroup>
    <RadioGroup className='max-w-sm' defaultValue='starter'>
      {plans.map(plan => (
        <Label
          className='hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-green-600 has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:border-green-900 dark:has-[[data-state=checked]]:bg-green-950'
          key={plan.id}>
          <RadioGroupItem
            className='shadow-none data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
            id={plan.name}
            value={plan.id}
          />
          <div className='grid gap-1 font-normal'>
            <div className='font-medium'>{plan.name}</div>
            <div className='text-muted-foreground leading-snug'>{plan.description}</div>
          </div>
        </Label>
      ))}
    </RadioGroup>
  </div>
)
