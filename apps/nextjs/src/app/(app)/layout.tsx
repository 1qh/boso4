import { cookies } from 'next/headers'

import { Separator } from '@a/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@a/ui/sidebar'

import { AppSidebar } from '~/demo/app-sidebar'
import { ModeSwitcher } from '~/demo/mode-switcher'
import { NavHeader } from '~/demo/nav-header'

export default async function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies(),
    defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className='bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b'>
          <div className='flex h-14 w-full items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1.5' />
            <Separator className='mr-2 data-[orientation=vertical]:h-4' orientation='vertical' />
            <NavHeader />
            <div className='ml-auto flex items-center gap-2'>
              <ModeSwitcher />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
