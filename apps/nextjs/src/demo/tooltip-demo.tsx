import { InfoIcon } from 'lucide-react'

import { Button } from '@a/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@a/ui/tooltip'

export const TooltipDemo = () => (
  <div className='flex flex-col gap-6 md:flex-row'>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
    <div className='flex gap-2'>
      {['top', 'right', 'bottom', 'left'].map(side => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button className='capitalize' variant='outline'>
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side as 'top' | 'right' | 'bottom' | 'left'}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size='icon' variant='ghost'>
          <InfoIcon />
          <span className='sr-only'>Info</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        To learn more about how this works, check out the docs. If you have any questions, please
        reach out to us.
      </TooltipContent>
    </Tooltip>
  </div>
)
