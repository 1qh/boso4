import Image from 'next/image'

import { AspectRatio } from '@a/ui/aspect-ratio'

export const AspectRatioDemo = () => (
  <div className='grid w-full max-w-sm items-start gap-4'>
    <AspectRatio className='bg-muted rounded-lg' ratio={16 / 9}>
      <Image
        alt='Photo by Drew Beamer'
        className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
        fill
        src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
      />
    </AspectRatio>
    <AspectRatio className='bg-muted rounded-lg' ratio={1 / 1}>
      <Image
        alt='Photo by Drew Beamer'
        className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
        fill
        src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
      />
    </AspectRatio>
  </div>
)
