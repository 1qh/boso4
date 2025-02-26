import { ChartBarMixed } from '~/charts/chart-bar-mixed'
import { ChartAreaDemo } from '~/demo/chart-area-demo'
import { ChartBarDemo } from '~/demo/chart-bar-demo'

export const ChartDemo = () => (
  <div className='flex w-full max-w-screen-xl flex-col flex-wrap gap-4 *:data-[slot=card]:flex-1 md:flex-row'>
    <ChartAreaDemo />
    <ChartBarDemo />
    <ChartBarMixed />
  </div>
)
