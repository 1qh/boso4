'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Dot, Line, LineChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A line chart with dots and colors'

const chartData = [
    { browser: 'chrome', fill: 'var(--color-chrome)', visitors: 275 },
    { browser: 'safari', fill: 'var(--color-safari)', visitors: 200 },
    { browser: 'firefox', fill: 'var(--color-firefox)', visitors: 187 },
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
      color: 'var(--chart-2)',
      label: 'Visitors'
    }
  } satisfies ChartConfig

export const ChartLineDotsColors = () => (
  <Card>
    <CardHeader>
      <CardTitle>Line Chart - Dots Colors</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 24,
            right: 24,
            top: 24
          }}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel indicator='line' nameKey='visitors' />}
            cursor={false}
          />
          <Line
            dataKey='visitors'
            dot={({ payload, ...props }) => (
              <Dot
                cx={props.cx}
                cy={props.cy}
                fill={payload.fill}
                key={payload.browser}
                r={5}
                stroke={payload.fill}
              />
            )}
            stroke='var(--color-visitors)'
            strokeWidth={2}
            type='natural'
          />
        </LineChart>
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
