'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A stacked area chart with expand stacking'

const chartData = [
    { desktop: 186, mobile: 80, month: 'January', other: 45 },
    { desktop: 305, mobile: 200, month: 'February', other: 100 },
    { desktop: 237, mobile: 120, month: 'March', other: 150 },
    { desktop: 73, mobile: 190, month: 'April', other: 50 },
    { desktop: 209, mobile: 130, month: 'May', other: 100 },
    { desktop: 214, mobile: 140, month: 'June', other: 160 }
  ],
  chartConfig = {
    desktop: {
      color: 'var(--chart-1)',
      label: 'Desktop'
    },
    mobile: {
      color: 'var(--chart-2)',
      label: 'Mobile'
    },
    other: {
      color: 'var(--chart-3)',
      label: 'Other'
    }
  } satisfies ChartConfig

export const ChartAreaStackedExpand = () => (
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Stacked Expanded</CardTitle>
      <CardDescription>Showing total visitors for the last 6months</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 12
          }}
          stackOffset='expand'>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey='month'
            tickFormatter={value => value.slice(0, 3)}
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent indicator='line' />} cursor={false} />
          <Area
            dataKey='other'
            fill='var(--color-other)'
            fillOpacity={0.1}
            stackId='a'
            stroke='var(--color-other)'
            type='natural'
          />
          <Area
            dataKey='mobile'
            fill='var(--color-mobile)'
            fillOpacity={0.4}
            stackId='a'
            stroke='var(--color-mobile)'
            type='natural'
          />
          <Area
            dataKey='desktop'
            fill='var(--color-desktop)'
            fillOpacity={0.4}
            stackId='a'
            stroke='var(--color-desktop)'
            type='natural'
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className='flex w-full items-start gap-2 text-sm'>
        <div className='grid gap-2'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
          </div>
          <div className='text-muted-foreground flex items-center gap-2 leading-none'>
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
)
