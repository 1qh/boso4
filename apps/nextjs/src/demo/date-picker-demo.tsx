'use client'

import type { DateRange } from 'react-day-picker'
import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Calendar } from '@a/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

export const DatePickerDemo = () => (
  <div className='flex flex-col items-start gap-4 md:flex-row'>
    <DatePickerSimple />
    <DatePickerWithRange />
  </div>
)

const DatePickerSimple = () => {
    const [date, setDate] = React.useState<Date>()

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'min-w-[200px] justify-start px-2 font-normal',
              !date && 'text-muted-foreground'
            )}
            variant='outline'>
            <CalendarIcon className='text-muted-foreground' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-auto p-0'>
          <Calendar initialFocus mode='single' onSelect={setDate} selected={date} />
        </PopoverContent>
      </Popover>
    )
  },
  DatePickerWithRange = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
    })

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn('w-fit justify-start px-2 font-normal', !date && 'text-muted-foreground')}
            id='date'
            variant='outline'>
            <CalendarIcon className='text-muted-foreground' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-auto p-0'>
          <Calendar
            defaultMonth={date?.from}
            initialFocus
            mode='range'
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    )
  }
