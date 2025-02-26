import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@a/ui/toggle-group'

export const ToggleGroupDemo = () => (
  <div className='flex flex-col items-center gap-6 md:flex-row'>
    <ToggleGroup type='multiple'>
      <ToggleGroupItem aria-label='Toggle bold' value='bold'>
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle italic' value='italic'>
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup
      className='*:data-[slot=toggle-group-item]:w-20'
      defaultValue='all'
      type='single'
      variant='outline'>
      <ToggleGroupItem aria-label='Toggle all' value='all'>
        All
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle missed' value='missed'>
        Missed
      </ToggleGroupItem>
    </ToggleGroup>

    <ToggleGroup
      className='*:data-[slot=toggle-group-item]:px-3'
      defaultValue='last-24-hours'
      size='sm'
      type='single'
      variant='outline'>
      <ToggleGroupItem aria-label='Toggle last 24 hours' value='last-24-hours'>
        Last 24 hours
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle last 7 days' value='last-7-days'>
        Last 7 days
      </ToggleGroupItem>
    </ToggleGroup>

    <ToggleGroup
      className='*:data-[slot=toggle-group-item]:px-3'
      defaultValue='last-24-hours'
      size='sm'
      type='single'>
      <ToggleGroupItem aria-label='Toggle last 24 hours' value='last-24-hours'>
        Last 24 hours
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle last 7 days' value='last-7-days'>
        Last 7 days
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
)
