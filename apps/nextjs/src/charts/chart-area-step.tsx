'use client'

import { Activity, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A step area chart'

const chartData = [
    { desktop: 186, month: 'January' },
    { desktop: 305, month: 'February' },
    { desktop: 237, month: 'March' },
    { desktop: 73, month: 'April' },
    { desktop: 209, month: 'May' },
    { desktop: 214, month: 'June' }
  ],
  chartConfig = {
    desktop: {
      color: 'var(--chart-1)',
      icon: Activity,
      label: 'Desktop'
    }
  } satisfies ChartConfig

export const ChartAreaStep = () => (
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Step</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey='month'
            tickFormatter={value => value.slice(0, 3)}
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Area
            dataKey='desktop'
            fill='var(--color-desktop)'
            fillOpacity={0.4}
            stroke='var(--color-desktop)'
            type='step'
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
