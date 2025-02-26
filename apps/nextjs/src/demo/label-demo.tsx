import { Checkbox } from '@a/ui/checkbox'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'
import { Textarea } from '@a/ui/textarea'

export const LabelDemo = () => (
  <div className='grid w-full max-w-sm gap-6'>
    <div className='flex items-center gap-3'>
      <Checkbox id='label-demo-terms' />
      <Label htmlFor='label-demo-terms'>Accept terms and conditions</Label>
    </div>
    <div className='grid gap-3'>
      <Label htmlFor='label-demo-username'>Username</Label>
      <Input id='label-demo-username' placeholder='Username' />
    </div>
    <div className='group grid gap-3' data-disabled>
      <Label htmlFor='label-demo-disabled'>Disabled</Label>
      <Input disabled id='label-demo-disabled' placeholder='Disabled' />
    </div>
    <div className='grid gap-3'>
      <Label htmlFor='label-demo-message'>Message</Label>
      <Textarea id='label-demo-message' placeholder='Message' />
    </div>
  </div>
)
