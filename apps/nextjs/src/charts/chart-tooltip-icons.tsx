'use client'

import { Footprints, Waves } from 'lucide-react'
import { Bar, BarChart, XAxis } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

export const description = 'A stacked bar chart with a legend'

const chartData = [
    { date: '2024-07-15', running: 450, swimming: 300 },
    { date: '2024-07-16', running: 380, swimming: 420 },
    { date: '2024-07-17', running: 520, swimming: 120 },
    { date: '2024-07-18', running: 140, swimming: 550 },
    { date: '2024-07-19', running: 600, swimming: 350 },
    { date: '2024-07-20', running: 480, swimming: 400 }
  ],
  chartConfig = {
    running: {
      color: 'var(--chart-1)',
      icon: Footprints,
      label: 'Running'
    },
    swimming: {
      color: 'var(--chart-2)',
      icon: Waves,
      label: 'Swimming'
    }
  } satisfies ChartConfig

export const ChartTooltipIcons = () => (
  <Card>
    <CardHeader>
      <CardTitle>Tooltip - Icons</CardTitle>
      <CardDescription>Tooltip with icons.</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            axisLine={false}
            dataKey='date'
            tickFormatter={value =>
              new Date(value).toLocaleDateString('en-US', {
                weekday: 'short'
              })
            }
            tickLine={false}
            tickMargin={10}
          />
          <Bar dataKey='running' fill='var(--color-running)' radius={[0, 0, 4, 4]} stackId='a' />
          <Bar dataKey='swimming' fill='var(--color-swimming)' radius={[4, 4, 0, 0]} stackId='a' />
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
            defaultIndex={1}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)
