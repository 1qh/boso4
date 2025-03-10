'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A radar chart with a grid and circle fill'

const chartData = [
    { desktop: 186, month: 'January' },
    { desktop: 305, month: 'February' },
    { desktop: 237, month: 'March' },
    { desktop: 203, month: 'April' },
    { desktop: 209, month: 'May' },
    { desktop: 214, month: 'June' }
  ],
  chartConfig = {
    desktop: {
      color: 'var(--chart-1)',
      label: 'Desktop'
    }
  } satisfies ChartConfig

export const ChartRadarGridCircleNoLines = () => (
  <Card>
    <CardHeader className='items-center pb-4'>
      <CardTitle>Radar Chart - Grid Circle - No lines</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent className='pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <RadarChart data={chartData}>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <PolarGrid gridType='circle' radialLines={false} />
          <PolarAngleAxis dataKey='month' />
          <Radar
            dataKey='desktop'
            dot={{
              fillOpacity: 1,
              r: 4
            }}
            fill='var(--color-desktop)'
            fillOpacity={0.6}
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
