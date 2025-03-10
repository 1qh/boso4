'use client'

import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'

import { Button } from '@a/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@a/ui/drawer'

const data = [
  {
    goal: 400
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 239
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 349
  }
]

export const DrawerDemo = () => (
  <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
    <DrawerBottom />
    <DrawerScrollableContent />
    <DrawerDirections />
  </div>
)

const DrawerBottom = () => {
    const [goal, setGoal] = React.useState(350),
      onClick = React.useCallback((adjustment: number) => {
        setGoal(prevGoal => Math.max(200, Math.min(400, prevGoal + adjustment)))
      }, [])

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline'>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className='p-4 pb-0'>
              <div className='flex items-center justify-center space-x-2'>
                <Button
                  className='h-8 w-8 shrink-0 rounded-full'
                  disabled={goal <= 200}
                  onClick={() => onClick(-10)}
                  size='icon'
                  variant='outline'>
                  <Minus />
                  <span className='sr-only'>Decrease</span>
                </Button>
                <div className='flex-1 text-center'>
                  <div className='text-7xl font-bold tracking-tighter'>{goal}</div>
                  <div className='text-muted-foreground text-[0.70rem] uppercase'>Calories/day</div>
                </div>
                <Button
                  className='h-8 w-8 shrink-0 rounded-full'
                  disabled={goal >= 400}
                  onClick={() => onClick(10)}
                  size='icon'
                  variant='outline'>
                  <Plus />
                  <span className='sr-only'>Increase</span>
                </Button>
              </div>
              <div className='mt-3 h-[120px]'>
                <ResponsiveContainer height='100%' width='100%'>
                  <BarChart data={data}>
                    <Bar
                      dataKey='goal'
                      style={
                        {
                          fill: 'hsl(var(--foreground))',
                          opacity: 0.9
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  },
  DrawerScrollableContent = () => (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button variant='outline'>Scrollable Content</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className='overflow-y-auto px-4 text-sm'>
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
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  directions = ['top', 'right', 'bottom', 'left'] as const,
  DrawerDirections = () => (
    <>
      {directions.map(direction => (
        <Drawer direction={direction} key={direction}>
          <DrawerTrigger asChild>
            <Button className='capitalize' variant='outline'>
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className='overflow-y-auto px-4 text-sm'>
              {Array.from({ length: 10 }).map((_, index) => (
                <p className='mb-4 leading-normal' key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              ))}
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </>
  )
