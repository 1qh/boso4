'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A radar chart with a radius axis'

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

export const ChartRadarRadius = () => (
  <Card>
    <CardHeader className='items-center pb-4'>
      <CardTitle>Radar Chart - Radius Axis</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent className='pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <RadarChart data={chartData}>
          <ChartTooltip
            content={<ChartTooltipContent indicator='line' labelKey='month' />}
            cursor={false}
          />
          <PolarGrid />
          <Radar dataKey='desktop' fill='var(--color-desktop)' fillOpacity={0.6} />
          <Radar dataKey='mobile' fill='var(--color-mobile)' />
          <PolarRadiusAxis
            angle={60}
            axisLine={false}
            orientation='middle'
            stroke='hsla(var(--foreground))'
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
