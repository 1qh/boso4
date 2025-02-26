'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A radar chart with a custom label'

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

export const ChartRadarLabelCustom = () => (
  <Card>
    <CardHeader className='items-center pb-4'>
      <CardTitle>Radar Chart - Custom Label</CardTitle>
      <CardDescription>Showing total visitors for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent className='pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <RadarChart
          data={chartData}
          margin={{
            bottom: 10,
            left: 10,
            right: 10,
            top: 10
          }}>
          <ChartTooltip content={<ChartTooltipContent indicator='line' />} cursor={false} />
          <PolarAngleAxis
            dataKey='month'
            tick={({ index, textAnchor, value, x, y, ...props }) => {
              const data = chartData[index]

              return (
                <text
                  fontSize={13}
                  fontWeight={500}
                  textAnchor={textAnchor}
                  x={x}
                  y={index === 0 ? y - 10 : y}
                  {...props}>
                  <tspan>{data?.desktop}</tspan>
                  <tspan className='fill-muted-foreground'>/</tspan>
                  <tspan>{data?.mobile}</tspan>
                  <tspan className='fill-muted-foreground' dy='1rem' fontSize={12} x={x}>
                    {data?.month}
                  </tspan>
                </text>
              )
            }}
          />

          <PolarGrid />
          <Radar dataKey='desktop' fill='var(--color-desktop)' fillOpacity={0.6} />
          <Radar dataKey='mobile' fill='var(--color-mobile)' />
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
