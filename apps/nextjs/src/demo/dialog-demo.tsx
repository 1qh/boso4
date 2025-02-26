import { Button } from '@a/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@a/ui/dialog'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'

export const DialogDemo = () => (
  <div className='flex flex-col items-start gap-4 md:flex-row'>
    <DialogWithForm />
    <DialogScrollableContent />
    <DialogWithStickyFooter />
  </div>
)

const DialogWithForm = () => (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline'>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name-1'>Name</Label>
              <Input defaultValue='Pedro Duarte' id='name-1' name='name' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='username-1'>Username</Label>
              <Input defaultValue='@peduarte' id='username-1' name='username' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  ),
  DialogScrollableContent = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Scrollable Content</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <div className='-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm'>
          <h4 className='mb-4 text-lg leading-none font-medium'>Lorem Ipsum</h4>
          {Array.from({ length: 10 }).map((_, index) => (
            <p className='mb-4 leading-normal' key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
  DialogWithStickyFooter = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Sticky Footer</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <div className='-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm'>
          <h4 className='mb-4 text-lg leading-none font-medium'>Lorem Ipsum</h4>
          {Array.from({ length: 10 }).map((_, index) => (
            <p className='mb-4 leading-normal' key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
