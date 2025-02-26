'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A horizontal bar chart'

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
      label: 'Desktop'
    }
  } satisfies ChartConfig

export const ChartBarHorizontal = () => (
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Horizontal</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout='vertical'
          margin={{
            left: -20
          }}>
          <XAxis dataKey='desktop' hide type='number' />
          <YAxis
            axisLine={false}
            dataKey='month'
            tickFormatter={value => value.slice(0, 3)}
            tickLine={false}
            tickMargin={10}
            type='category'
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Bar dataKey='desktop' fill='var(--color-desktop)' radius={5} />
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className='flex-col items-start gap-2 text-sm'>
      <div className='flex gap-2 leading-none font-medium'>
        Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
      </div>
      <div className='text-muted-foreground leading-none'>
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
)
