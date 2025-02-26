'use client'

import * as React from 'react'
import { CheckIcon, ChevronDownIcon, ChevronsUpDown, PlusCircleIcon } from 'lucide-react'

import { cn } from '@a/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@a/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

const frameworks = [
  {
    label: 'Next.js',
    value: 'next.js'
  },
  {
    label: 'SvelteKit',
    value: 'sveltekit'
  },
  {
    label: 'Nuxt.js',
    value: 'nuxt.js'
  },
  {
    label: 'Remix',
    value: 'remix'
  },
  {
    label: 'Astro',
    value: 'astro'
  }
]

type Framework = (typeof frameworks)[number]

const users = [
  {
    id: '1',
    username: 'shadcn'
  },
  {
    id: '2',
    username: 'leerob'
  },
  {
    id: '3',
    username: 'evilrabbit'
  }
] as const

type User = (typeof users)[number]

const timezones = [
  {
    label: 'Americas',
    timezones: [
      { label: '(GMT-5) New York', value: 'America/New_York' },
      { label: '(GMT-8) Los Angeles', value: 'America/Los_Angeles' },
      { label: '(GMT-6) Chicago', value: 'America/Chicago' },
      { label: '(GMT-5) Toronto', value: 'America/Toronto' },
      { label: '(GMT-8) Vancouver', value: 'America/Vancouver' },
      { label: '(GMT-3) São Paulo', value: 'America/Sao_Paulo' }
    ]
  },
  {
    label: 'Europe',
    timezones: [
      { label: '(GMT+0) London', value: 'Europe/London' },
      { label: '(GMT+1) Paris', value: 'Europe/Paris' },
      { label: '(GMT+1) Berlin', value: 'Europe/Berlin' },
      { label: '(GMT+1) Rome', value: 'Europe/Rome' },
      { label: '(GMT+1) Madrid', value: 'Europe/Madrid' },
      { label: '(GMT+1) Amsterdam', value: 'Europe/Amsterdam' }
    ]
  },
  {
    label: 'Asia/Pacific',
    timezones: [
      { label: '(GMT+9) Tokyo', value: 'Asia/Tokyo' },
      { label: '(GMT+8) Shanghai', value: 'Asia/Shanghai' },
      { label: '(GMT+8) Singapore', value: 'Asia/Singapore' },
      { label: '(GMT+4) Dubai', value: 'Asia/Dubai' },
      { label: '(GMT+11) Sydney', value: 'Australia/Sydney' },
      { label: '(GMT+9) Seoul', value: 'Asia/Seoul' }
    ]
  }
] as const

type Timezone = (typeof timezones)[number]

export const ComboboxDemo = () => (
  <div className='flex w-full flex-col items-start gap-4 md:flex-row'>
    <FrameworkCombobox frameworks={[...frameworks]} />
    <UserCombobox selectedUserId={users[0].id} users={[...users]} />
    <TimezoneCombobox selectedTimezone={timezones[0].timezones[0]} timezones={[...timezones]} />
  </div>
)

const FrameworkCombobox = ({ frameworks }: { readonly frameworks: Framework[] }) => {
    const [open, setOpen] = React.useState(false),
      [value, setValue] = React.useState('')

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className='w-full justify-between md:max-w-[200px]'
            role='combobox'
            variant='outline'>
            {value
              ? frameworks.find(framework => framework.value === value)?.label
              : 'Select framework...'}
            <ChevronsUpDown className='text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popover-trigger-width) p-0'>
          <Command>
            <CommandInput placeholder='Search framework...' />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map(framework => (
                  <CommandItem
                    key={framework.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    value={framework.value}>
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
  UserCombobox = ({
    selectedUserId,
    users
  }: {
    readonly selectedUserId: string
    readonly users: User[]
  }) => {
    const [open, setOpen] = React.useState(false),
      [value, setValue] = React.useState(selectedUserId),
      selectedUser = React.useMemo(() => users.find(user => user.id === value), [value, users])

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className='w-full justify-between px-2 md:max-w-[200px]'
            role='combobox'
            variant='outline'>
            {selectedUser ? (
              <div className='flex items-center gap-2'>
                <Avatar className='size-5'>
                  <AvatarImage src={`https://github.com/${selectedUser.username}.png`} />
                  <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
                </Avatar>
                {selectedUser.username}
              </div>
            ) : (
              'Select user...'
            )}
            <ChevronsUpDown className='text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popover-trigger-width) p-0'>
          <Command>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map(user => (
                  <CommandItem
                    key={user.id}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                    value={user.id}>
                    <Avatar className='size-5'>
                      <AvatarImage src={`https://github.com/${user.username}.png`} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    {user.username}
                    <CheckIcon
                      className={cn('ml-auto', value === user.id ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem>
                  <PlusCircleIcon />
                  Create user
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
  TimezoneCombobox = ({
    selectedTimezone,
    timezones
  }: {
    readonly selectedTimezone: Timezone['timezones'][number]
    readonly timezones: Timezone[]
  }) => {
    const [open, setOpen] = React.useState(false),
      [value, setValue] = React.useState(selectedTimezone.value),
      selectedGroup = React.useMemo(
        () => timezones.find(group => group.timezones.find(tz => tz.value === value)),
        [value, timezones]
      ),
      selectedTimezoneLabel = React.useMemo(
        () => selectedGroup?.timezones.find(tz => tz.value === value)?.label,
        [value, selectedGroup]
      )

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button className='h-12 w-full justify-between px-2.5 md:max-w-[200px]' variant='outline'>
            {selectedTimezone ? (
              <div className='flex flex-col items-start gap-0.5'>
                <span className='text-muted-foreground text-xs font-normal'>
                  {selectedGroup?.label}
                </span>
                <span>{selectedTimezoneLabel}</span>
              </div>
            ) : (
              'Select timezone'
            )}
            <ChevronDownIcon className='text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='p-0'>
          <Command>
            <CommandInput placeholder='Search timezone...' />
            <CommandList className='scroll-pb-12'>
              <CommandEmpty>No timezone found.</CommandEmpty>
              {timezones.map(region => (
                <CommandGroup heading={region.label} key={region.label}>
                  {region.timezones.map(timezone => (
                    <CommandItem
                      key={timezone.value}
                      onSelect={currentValue => {
                        setValue(currentValue as Timezone['timezones'][number]['value'])
                        setOpen(false)
                      }}
                      value={timezone.value}>
                      {timezone.label}
                      <CheckIcon
                        className='ml-auto opacity-0 data-[selected=true]:opacity-100'
                        data-selected={value === timezone.value}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandSeparator className='sticky bottom-10' />
              <CommandGroup className='bg-popover sticky bottom-0'>
                <CommandItem>
                  <PlusCircleIcon />
                  Create timezone
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
