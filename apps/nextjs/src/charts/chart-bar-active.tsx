'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A bar chart with an active bar'

const chartData = [
    { browser: 'chrome', fill: 'var(--color-chrome)', visitors: 187 },
    { browser: 'safari', fill: 'var(--color-safari)', visitors: 200 },
    { browser: 'firefox', fill: 'var(--color-firefox)', visitors: 275 },
    { browser: 'edge', fill: 'var(--color-edge)', visitors: 173 },
    { browser: 'other', fill: 'var(--color-other)', visitors: 90 }
  ],
  chartConfig = {
    chrome: {
      color: 'var(--chart-1)',
      label: 'Chrome'
    },
    edge: {
      color: 'var(--chart-4)',
      label: 'Edge'
    },
    firefox: {
      color: 'var(--chart-3)',
      label: 'Firefox'
    },
    other: {
      color: 'var(--chart-5)',
      label: 'Other'
    },
    safari: {
      color: 'var(--chart-2)',
      label: 'Safari'
    },
    visitors: {
      label: 'Visitors'
    }
  } satisfies ChartConfig

export const ChartBarActive = () => (
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart - Active</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey='browser'
            tickFormatter={value => chartConfig[value as keyof typeof chartConfig].label}
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Bar
            activeBar={({ ...props }) => (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            )}
            activeIndex={2}
            dataKey='visitors'
            radius={8}
            strokeWidth={2}
          />
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
