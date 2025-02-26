'use client'

import type { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart, Sector } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A donut chart with an active sector'

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
      label: 'Visitors'
    }
  } satisfies ChartConfig

export const ChartPieDonutActive = () => (
  <Card className='flex flex-col'>
    <CardHeader className='items-center pb-0'>
      <CardTitle>Pie Chart - Donut Active</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent className='flex-1 pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Pie
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
            data={chartData}
            dataKey='visitors'
            innerRadius={60}
            nameKey='browser'
            strokeWidth={5}
          />
        </PieChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className='flex-col gap-2 text-sm'>
      <div className='flex items-center gap-2 leading-none font-medium'>
        Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
      </div>
      <div className='text-muted-foreground leading-none'>
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
)
