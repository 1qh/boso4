import { Button } from '@a/ui/button'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@a/ui/sheet'

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const

export const SheetDemo = () => (
  <div className='flex flex-col gap-6 md:flex-row'>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>Name</Label>
            <Input defaultValue='Pedro Duarte' id='sheet-demo-name' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>Username</Label>
            <Input defaultValue='@peduarte' id='sheet-demo-username' />
          </div>
        </div>
        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    <div className='flex gap-2'>
      {SHEET_SIDES.map(side => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button className='capitalize' variant='outline'>
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className='overflow-y-auto px-4 text-sm'>
              <h4 className='mb-4 text-lg leading-none font-medium'>Lorem Ipsum</h4>
              {Array.from({ length: 10 }).map((_, index) => (
                <p className='mb-4 leading-normal' key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type='submit'>Save changes</Button>
              <SheetClose asChild>
                <Button variant='outline'>Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  </div>
)
