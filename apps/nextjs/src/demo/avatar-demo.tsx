import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'

export const AvatarDemo = () => (
  <div className='flex flex-col items-center gap-4 md:flex-row'>
    <Avatar>
      <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar className='size-12'>
      <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar className='rounded-lg'>
      <AvatarImage alt='@evilrabbit' src='https://github.com/evilrabbit.png' />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
    <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
      <Avatar>
        <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@leerob' src='https://github.com/leerob.png' />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@evilrabbit' src='https://github.com/evilrabbit.png' />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
    <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
      <Avatar>
        <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@leerob' src='https://github.com/leerob.png' />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@evilrabbit' src='https://github.com/evilrabbit.png' />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
    <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out'>
      <Avatar>
        <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@leerob' src='https://github.com/leerob.png' />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt='@evilrabbit' src='https://github.com/evilrabbit.png' />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
  </div>
)
