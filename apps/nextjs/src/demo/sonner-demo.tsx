'use client'

import { toast } from 'sonner'

import { Button } from '@a/ui/button'

export const SonnerDemo = () => (
  <Button
    onClick={() =>
      toast('Event has been created', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        },
        description: 'Sunday, December 03, 2023 at 9:00 AM'
      })
    }
    variant='outline'>
    Show Toast
  </Button>
)
