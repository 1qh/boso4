'use client'

import { Pie, PieChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent } from '@a/ui/chart'

export const description = 'A pie chart with a legend'

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

export const ChartPieLegend = () => (
  <Card className='flex flex-col'>
    <CardHeader className='items-center pb-0'>
      <CardTitle>Pie Chart - Legend</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent className='flex-1 pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[300px]' config={chartConfig}>
        <PieChart>
          <Pie data={chartData} dataKey='visitors' />
          <ChartLegend
            className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center'
            content={<ChartLegendContent nameKey='browser' />}
          />
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
)
