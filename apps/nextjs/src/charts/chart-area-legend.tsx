'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@a/ui/chart'

export const description = 'An area chart with a legend'

const chartData = [
    { desktop: 186, mobile: 80, month: 'January' },
    { desktop: 305, mobile: 200, month: 'February' },
    { desktop: 237, mobile: 120, month: 'March' },
    { desktop: 73, mobile: 190, month: 'April' },
    { desktop: 209, mobile: 130, month: 'May' },
    { desktop: 214, mobile: 140, month: 'June' }
  ],
  chartConfig = {
    desktop: {
      color: 'var(--chart-1)',
      label: 'Desktop'
    },
    mobile: {
      color: 'var(--chart-2)',
      label: 'Mobile'
    }
  } satisfies ChartConfig

export const ChartAreaLegend = () => (
  <Card>
    <CardHeader>
      <CardTitle>Area Chart - Legend</CardTitle>
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
          <ChartTooltip content={<ChartTooltipContent indicator='line' />} cursor={false} />
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
          <ChartLegend content={<ChartLegendContent />} />
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
