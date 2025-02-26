import { BoldIcon, BookmarkIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { Toggle } from '@a/ui/toggle'

export const ToggleDemo = () => (
  <div className='flex flex-wrap items-center gap-6'>
    <Toggle aria-label='Toggle italic'>
      <BoldIcon />
    </Toggle>
    <Toggle aria-label='Toggle italic' variant='default'>
      <UnderlineIcon />
    </Toggle>
    <Toggle aria-label='Toggle italic' disabled variant='default'>
      Disabled
    </Toggle>
    <Toggle aria-label='Toggle italic' variant='outline'>
      <ItalicIcon />
      Italic
    </Toggle>
    <Toggle aria-label='Toggle book' className='data-[state=on]:[&_svg]:fill-accent-foreground'>
      <BookmarkIcon />
    </Toggle>
    <Toggle aria-label='Toggle italic' size='sm' variant='outline'>
      Small
    </Toggle>
    <Toggle aria-label='Toggle italic' size='lg' variant='outline'>
      Large
    </Toggle>
  </div>
)
