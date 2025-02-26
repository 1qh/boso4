'use client'

import { TrendingUp } from 'lucide-react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A radial chart with stacked sections'

const chartData = [{ desktop: 1260, mobile: 570, month: 'january' }],
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

export const ChartRadialStacked = () => {
  const c = chartData[0] ?? { desktop: 0, mobile: 0 },
    totalVisitors = c.desktop + c.mobile

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center pb-0'>
        <ChartContainer className='mx-auto aspect-square w-full max-w-[250px]' config={chartConfig}>
          <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text textAnchor='middle' x={viewBox.cx} y={viewBox.cy}>
                        <tspan
                          className='fill-foreground text-2xl font-bold'
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}>
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          className='fill-muted-foreground'
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}>
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              className='stroke-transparent stroke-2'
              cornerRadius={5}
              dataKey='desktop'
              fill='var(--color-desktop)'
              stackId='a'
            />
            <RadialBar
              className='stroke-transparent stroke-2'
              cornerRadius={5}
              dataKey='mobile'
              fill='var(--color-mobile)'
              stackId='a'
            />
          </RadialBarChart>
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
}
