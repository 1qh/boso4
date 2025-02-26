/* eslint-disable one-var */
/* eslint-disable sort-vars */

'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@a/ui'

const THEMES = {
  dark: '.dark',
  light: ''
} as const

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null),
  useChart = () => {
    const context = React.useContext(ChartContext)

    if (!context) {
      throw new Error('useChart must be used within a <ChartContainer />')
    }

    return context
  },
  getPayloadConfigFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
    if (typeof payload !== 'object' || payload === null) {
      return undefined
    }

    const payloadPayload =
      'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
        ? payload.payload
        : undefined

    let configLabelKey: string = key

    if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
      configLabelKey = payload[key as keyof typeof payload] as string
    } else if (
      payloadPayload &&
      key in payloadPayload &&
      typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
    ) {
      configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
    }

    return configLabelKey in config ? config[configLabelKey] : config[key]
  },
  ChartStyle = ({ id, config }: { readonly id: string; readonly config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(([, cf]) => cf.theme ?? cf.color)

    if (!colorConfig.length) {
      return null
    }

    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: Object.entries(THEMES)
            .map(
              ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`
            )
            .join('\n')
        }}
      />
    )
  },
  ChartContainer = ({
    id,
    className,
    children,
    config,
    ...props
  }: React.ComponentProps<'div'> & {
    readonly config: ChartConfig
    readonly children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children']
  }) => {
    const uniqueId = React.useId(),
      chartId = `chart-${id ?? uniqueId.replace(/:/gu, '')}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          className={cn(
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
            className
          )}
          data-chart={chartId}
          data-slot='chart'
          {...props}>
          <ChartStyle config={config} id={chartId} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  },
  ChartTooltip = RechartsPrimitive.Tooltip,
  ChartTooltipContent = ({
    active,
    payload,
    className,
    indicator = 'dot',
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      readonly hideLabel?: boolean
      readonly hideIndicator?: boolean
      readonly indicator?: 'line' | 'dot' | 'dashed'
      readonly nameKey?: string
      readonly labelKey?: string
    }) => {
    const { config } = useChart(),
      tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
          return null
        }

        const [item] = payload,
          key = item ? `${labelKey ?? item.dataKey ?? item.name}` : 'value',
          itemConfig = getPayloadConfigFromPayload(config, item, key),
          value =
            !labelKey && typeof label === 'string'
              ? (config[label]?.label ?? label)
              : itemConfig?.label

        if (labelFormatter) {
          return (
            <div className={cn('font-medium', labelClassName)}>
              {labelFormatter(value, payload)}
            </div>
          )
        }

        if (!value) {
          return null
        }

        return <div className={cn('font-medium', labelClassName)}>{value}</div>
      }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot'

    return (
      <div
        className={cn(
          'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}>
        {nestLabel ? null : tooltipLabel}
        <div className='grid gap-1.5'>
          {payload.map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`,
              itemConfig = getPayloadConfigFromPayload(config, item, key),
              indicatorColor =
                color ?? (item.payload as { fill: string | undefined }).fill ?? item.color

            return (
              <div
                className={cn(
                  '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                )}
                key={item.dataKey}>
                {formatter && item.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload as [])
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                            {
                              'h-2.5 w-2.5': indicator === 'dot',
                              'my-0.5': nestLabel && indicator === 'dashed',
                              'w-0 border-[1.5px] border-dashed bg-transparent':
                                indicator === 'dashed',
                              'w-1': indicator === 'line'
                            }
                          )}
                          style={
                            {
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}>
                      <div className='grid gap-1.5'>
                        {nestLabel ? tooltipLabel : null}
                        <span className='text-muted-foreground'>
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value ? (
                        <span className='text-foreground font-mono font-medium tabular-nums'>
                          {item.value.toLocaleString()}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  ChartLegend = RechartsPrimitive.Legend,
  ChartLegendContent = ({
    className,
    hideIcon = false,
    payload,
    verticalAlign = 'bottom',
    nameKey
  }: React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
      readonly hideIcon?: boolean
      readonly nameKey?: string
    }) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}>
        {payload.map(item => {
          const key = nameKey ?? item.dataKey?.toString() ?? 'value',
            itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              className={cn(
                '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
              )}
              key={item.value as string}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className='h-2 w-2 shrink-0 rounded-[2px]'
                  style={{
                    backgroundColor: item.color
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
}
