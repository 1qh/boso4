import * as Charts from '~/app/(app)/charts/charts'
import { ComponentWrapper } from '~/demo/component-wrapper'

export default function ChartsPage() {
  return (
    <div className='grid flex-1 grid-cols-3 items-start gap-4 p-4 2xl:grid-cols-4'>
      {Object.entries(Charts).map(([key, Component]) => (
        <ComponentWrapper
          className='w-auto data-[name=chartareainteractive]:col-span-3 data-[name=chartbarinteractive]:col-span-3 data-[name=chartlineinteractive]:col-span-3 **:data-[slot=card]:w-full'
          key={key}
          name={key}>
          <Component />
        </ComponentWrapper>
      ))}
    </div>
  )
}
