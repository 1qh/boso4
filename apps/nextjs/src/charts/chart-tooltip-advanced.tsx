'use client'

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
      label: 'Running'
    },
    swimming: {
      color: 'var(--chart-2)',
      label: 'Swimming'
    }
  } satisfies ChartConfig

export const ChartTooltipAdvanced = () => (
  <Card>
    <CardHeader>
      <CardTitle>Tooltip - Advanced</CardTitle>
      <CardDescription>Tooltip with custom formatter and total.</CardDescription>
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
            content={
              <ChartTooltipContent
                className='w-[180px]'
                formatter={(value, name, item, index) => (
                  <>
                    <div
                      className='h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)'
                      style={
                        {
                          '--color-bg': `var(--color-${name})`
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig].label || name}
                    <div className='text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums'>
                      {value}
                      <span className='text-muted-foreground font-normal'>kcal</span>
                    </div>
                    {/* Add this after the last item */}
                    {index === 1 && (
                      <div className='text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium'>
                        Total
                        <div className='text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums'>
                          {item.payload.running + item.payload.swimming}
                          <span className='text-muted-foreground font-normal'>kcal</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
                hideLabel
              />
            }
            cursor={false}
            defaultIndex={1}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)
