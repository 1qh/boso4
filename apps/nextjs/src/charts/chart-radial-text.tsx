'use client'

import { TrendingUp } from 'lucide-react'
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer } from '@a/ui/chart'

export const description = 'A radial chart with text'

const chartData = [{ browser: 'safari', fill: 'var(--color-safari)', visitors: 200 }],
  chartConfig = {
    safari: {
      color: 'var(--chart-2)',
      label: 'Safari'
    },
    visitors: {
      label: 'Visitors'
    }
  } satisfies ChartConfig

export const ChartRadialText = () => (
  <Card className='flex flex-col'>
    <CardHeader className='items-center pb-0'>
      <CardTitle>Radial Chart - Text</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent className='flex-1 pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={chartConfig}>
        <RadialBarChart
          data={chartData}
          endAngle={250}
          innerRadius={80}
          outerRadius={110}
          startAngle={0}>
          <PolarGrid
            className='first:fill-muted last:fill-background'
            gridType='circle'
            polarRadius={[86, 74]}
            radialLines={false}
            stroke='none'
          />
          <RadialBar background cornerRadius={10} dataKey='visitors' />
          <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      dominantBaseline='middle'
                      textAnchor='middle'
                      x={viewBox.cx}
                      y={viewBox.cy}>
                      <tspan
                        className='fill-foreground text-4xl font-bold'
                        x={viewBox.cx}
                        y={viewBox.cy}>
                        {chartData[0]?.visitors.toLocaleString()}
                      </tspan>
                      <tspan
                        className='fill-muted-foreground'
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 24}>
                        Visitors
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
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
