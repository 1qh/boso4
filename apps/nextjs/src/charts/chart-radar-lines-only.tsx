'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A radar chart with lines only'

const chartData = [
    { desktop: 186, mobile: 160, month: 'January' },
    { desktop: 185, mobile: 170, month: 'February' },
    { desktop: 207, mobile: 180, month: 'March' },
    { desktop: 173, mobile: 160, month: 'April' },
    { desktop: 160, mobile: 190, month: 'May' },
    { desktop: 174, mobile: 204, month: 'June' }
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

export const ChartRadarLinesOnly = () => (
  <Card>
    <CardHeader className='items-center pb-4'>
      <CardTitle>Radar Chart - Lines Only</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent className='pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <RadarChart data={chartData}>
          <ChartTooltip content={<ChartTooltipContent indicator='line' />} cursor={false} />
          <PolarAngleAxis dataKey='month' />
          <PolarGrid radialLines={false} />
          <Radar
            dataKey='desktop'
            fill='var(--color-desktop)'
            fillOpacity={0}
            stroke='var(--color-desktop)'
            strokeWidth={2}
          />
          <Radar
            dataKey='mobile'
            fill='var(--color-mobile)'
            fillOpacity={0}
            stroke='var(--color-mobile)'
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className='flex-col gap-2 text-sm'>
      <div className='flex items-center gap-2 leading-none font-medium'>
        Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
      </div>
      <div className='text-muted-foreground flex items-center gap-2 leading-none'>
        January - June 2024
      </div>
    </CardFooter>
  </Card>
)
