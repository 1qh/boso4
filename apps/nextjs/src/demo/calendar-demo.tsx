'use client'

import type { DateRange } from 'react-day-picker'
import * as React from 'react'
import { addDays } from 'date-fns'

import { Calendar } from '@a/ui/calendar'

export const CalendarDemo = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date()),
    [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
    }),
    [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 50)
    })

  return (
    <div className='flex flex-col flex-wrap items-start gap-2 md:flex-row'>
      <Calendar
        className='rounded-md border shadow-sm'
        mode='single'
        onSelect={setDate}
        selected={date}
      />
      <Calendar
        className='rounded-md border shadow-sm'
        defaultMonth={dateRange?.from}
        disabled={date => date > new Date() || date < new Date('1900-01-01')}
        mode='range'
        numberOfMonths={2}
        onSelect={setDateRange}
        selected={dateRange}
      />
      <Calendar
        className='rounded-md border shadow-sm [&>div]:gap-5'
        defaultMonth={range?.from}
        mode='range'
        numberOfMonths={3}
        onSelect={setRange}
        selected={range}
      />
    </div>
  )
}
