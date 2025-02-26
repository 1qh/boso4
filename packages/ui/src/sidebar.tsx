'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Input } from '@a/ui/input'
import { Separator } from '@a/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@a/ui/sheet'
import { Skeleton } from '@a/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@a/ui/tooltip'
import { useIsMobile } from '@a/ui/use-mobile'

const SIDEBAR_COOKIE_NAME = 'sidebar_state',
  SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7,
  SIDEBAR_WIDTH = '16rem',
  SIDEBAR_WIDTH_MOBILE = '18rem',
  SIDEBAR_WIDTH_ICON = '3rem',
  SIDEBAR_KEYBOARD_SHORTCUT = 'b'

interface SidebarContextI {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  state: 'expanded' | 'collapsed'
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextI | null>(null),
  useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider.')
    }
    return context
  },
  SidebarProvider = ({
    children,
    className,
    defaultOpen = true,
    onOpenChange: setOpenProp,
    open: openProp,
    style,
    ...props
  }: React.ComponentProps<'div'> & {
    readonly defaultOpen?: boolean
    readonly onOpenChange?: (open: boolean) => void
    readonly open?: boolean
  }) => {
    const isMobile = useIsMobile(),
      [openMobile, setOpenMobile] = React.useState(false),
      [_open, _setOpen] = React.useState(defaultOpen),
      open = openProp ?? _open,
      setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
          const openState = typeof value === 'function' ? value(open) : value
          if (setOpenProp) {
            setOpenProp(openState)
          } else {
            _setOpen(openState)
          }
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        },
        [setOpenProp, open]
      ),
      toggleSidebar = React.useCallback(
        () => (isMobile ? setOpenMobile(o => !o) : setOpen(o => !o)),
        [isMobile, setOpen, setOpenMobile]
      )

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          toggleSidebar()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])
    const state = open ? 'expanded' : 'collapsed',
      contextValue = React.useMemo<SidebarContextI>(
        () => ({ isMobile, open, openMobile, setOpen, setOpenMobile, state, toggleSidebar }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
      )
    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            className={cn(
              'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
              className
            )}
            data-slot='sidebar-wrapper'
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style
              } as React.CSSProperties
            }
            {...props}>
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  },
  Sidebar = ({
    children,
    className,
    collapsible = 'offcanvas',
    side = 'left',
    variant = 'sidebar',
    ...props
  }: React.ComponentProps<'div'> & {
    readonly collapsible?: 'offcanvas' | 'icon' | 'none'
    readonly side?: 'left' | 'right'
    readonly variant?: 'sidebar' | 'floating' | 'inset'
  }) => {
    const { isMobile, openMobile, setOpenMobile, state } = useSidebar()

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
            className
          )}
          data-slot='sidebar'
          {...props}>
          {children}
        </div>
      )
    }
    if (isMobile) {
      return (
        <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <SheetContent
            className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
            data-mobile='true'
            data-sidebar='sidebar'
            data-slot='sidebar'
            side={side}
            style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}>
            <div className='flex h-full w-full flex-col'>{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        className='group peer text-sidebar-foreground hidden md:block'
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-side={side}
        data-slot='sidebar'
        data-state={state}
        data-variant={variant}>
        <div
          className={cn(
            'relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
              : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
          )}
        />
        <div
          className={cn(
            'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
              : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className
          )}
          {...props}>
          <div
            className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
            data-sidebar='sidebar'>
            {children}
          </div>
        </div>
      </div>
    )
  },
  SidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<typeof Button>) => {
    const { toggleSidebar } = useSidebar()

    return (
      <Button
        className={cn('h-7 w-7', className)}
        data-sidebar='trigger'
        data-slot='sidebar-trigger'
        onClick={event => {
          onClick?.(event)
          toggleSidebar()
        }}
        size='icon'
        variant='ghost'
        {...props}>
        <PanelLeftIcon />
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    )
  },
  SidebarRail = ({ className, ...props }: React.ComponentProps<'button'>) => {
    const { toggleSidebar } = useSidebar()
    return (
      <button
        aria-label='Toggle Sidebar'
        className={cn(
          'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
          'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
          '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
          'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
          '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
          '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
          className
        )}
        data-sidebar='rail'
        data-slot='sidebar-rail'
        onClick={toggleSidebar}
        tabIndex={-1}
        title='Toggle Sidebar'
        {...props}
      />
    )
  },
  SidebarInset = ({ className, ...props }: React.ComponentProps<'main'>) => (
    <main
      className={cn(
        'bg-background relative flex min-h-svh flex-1 flex-col',
        'peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className
      )}
      data-slot='sidebar-inset'
      {...props}
    />
  ),
  SidebarInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => (
    <Input
      className={cn('bg-background h-8 w-full shadow-none', className)}
      data-sidebar='input'
      data-slot='sidebar-input'
      {...props}
    />
  ),
  SidebarHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='header'
      data-slot='sidebar-header'
      {...props}
    />
  ),
  SidebarFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='footer'
      data-slot='sidebar-footer'
      {...props}
    />
  ),
  SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
    <Separator
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      data-sidebar='separator'
      data-slot='sidebar-separator'
      {...props}
    />
  ),
  SidebarContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      data-sidebar='content'
      data-slot='sidebar-content'
      {...props}
    />
  ),
  SidebarGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      data-sidebar='group'
      data-slot='sidebar-group'
      {...props}
    />
  ),
  SidebarGroupLabel = ({
    asChild = false,
    className,
    ...props
  }: React.ComponentProps<'div'> & { readonly asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        className={cn(
          'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
          className
        )}
        data-sidebar='group-label'
        data-slot='sidebar-group-label'
        {...props}
      />
    )
  },
  SidebarGroupAction = ({
    asChild = false,
    className,
    ...props
  }: React.ComponentProps<'button'> & { readonly asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',

          'after:absolute after:-inset-2 md:after:hidden',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-sidebar='group-action'
        data-slot='sidebar-group-action'
        {...props}
      />
    )
  },
  SidebarGroupContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('w-full text-sm', className)}
      data-sidebar='group-content'
      data-slot='sidebar-group-content'
      {...props}
    />
  ),
  SidebarMenu = ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      data-sidebar='menu'
      data-slot='sidebar-menu'
      {...props}
    />
  ),
  SidebarMenuItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li
      className={cn('group/menu-item relative', className)}
      data-sidebar='menu-item'
      data-slot='sidebar-menu-item'
      {...props}
    />
  ),
  sidebarMenuButtonVariants = cva(
    'peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
    {
      defaultVariants: {
        size: 'default',
        variant: 'default'
      },
      variants: {
        size: {
          default: 'h-8 text-sm',
          lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
          sm: 'h-7 text-xs'
        },
        variant: {
          default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          outline:
            'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
        }
      }
    }
  ),
  SidebarMenuButton = ({
    asChild = false,
    className,
    isActive = false,
    size = 'default',
    tooltip,
    variant = 'default',
    ...props
  }: React.ComponentProps<'button'> & {
    readonly asChild?: boolean
    readonly isActive?: boolean
    readonly tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>) => {
    const Comp = asChild ? Slot : 'button',
      { isMobile, state } = useSidebar(),
      button = (
        <Comp
          className={cn(sidebarMenuButtonVariants({ size, variant }), className)}
          data-active={isActive}
          data-sidebar='menu-button'
          data-size={size}
          data-slot='sidebar-menu-button'
          {...props}
        />
      )

    if (!tooltip) {
      return button
    }
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          align='center'
          hidden={state !== 'collapsed' || isMobile}
          side='right'
          {...(typeof tooltip === 'string' ? { children: tooltip } : tooltip)}
        />
      </Tooltip>
    )
  },
  SidebarMenuAction = ({
    asChild = false,
    className,
    showOnHover = false,
    ...props
  }: React.ComponentProps<'button'> & {
    readonly asChild?: boolean
    readonly showOnHover?: boolean
  }) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'after:absolute after:-inset-2 md:after:hidden',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          showOnHover &&
            'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
          className
        )}
        data-sidebar='menu-action'
        data-slot='sidebar-menu-action'
        {...props}
      />
    )
  },
  SidebarMenuBadge = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='menu-badge'
      data-slot='sidebar-menu-badge'
      {...props}
    />
  ),
  SidebarMenuSkeleton = ({
    className,
    showIcon = false,
    ...props
  }: React.ComponentProps<'div'> & {
    readonly showIcon?: boolean
  }) => {
    const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])

    return (
      <div
        className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
        data-sidebar='menu-skeleton'
        data-slot='sidebar-menu-skeleton'
        {...props}>
        {showIcon ? (
          <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' />
        ) : null}
        <Skeleton
          className='h-4 max-w-(--skeleton-width) flex-1'
          data-sidebar='menu-skeleton-text'
          style={{ '--skeleton-width': width } as React.CSSProperties}
        />
      </div>
    )
  },
  SidebarMenuSub = ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='menu-sub'
      data-slot='sidebar-menu-sub'
      {...props}
    />
  ),
  SidebarMenuSubItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li
      className={cn('group/menu-sub-item relative', className)}
      data-sidebar='menu-sub-item'
      data-slot='sidebar-menu-sub-item'
      {...props}
    />
  ),
  SidebarMenuSubButton = ({
    asChild = false,
    className,
    isActive = false,
    size = 'md',
    ...props
  }: React.ComponentProps<'a'> & {
    readonly asChild?: boolean
    readonly isActive?: boolean
    readonly size?: 'sm' | 'md'
  }) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        className={cn(
          'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-active={isActive}
        data-sidebar='menu-sub-button'
        data-size={size}
        data-slot='sidebar-menu-sub-button'
        {...props}
      />
    )
  }

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
