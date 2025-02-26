'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRightIcon,
  Command,
  GalleryVerticalEnd,
  Search,
  Settings2,
  SquareTerminal
} from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@a/ui/collapsible'
import { Label } from '@a/ui/label'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@a/ui/sidebar'

import { NavUser } from '~/sidebar/nav-user'
import { TeamSwitcher } from '~/sidebar/team-switcher'

// This is sample data.
const data = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#'
        },
        {
          title: 'Starred',
          url: '#'
        },
        {
          title: 'Settings',
          url: '#'
        }
      ],
      title: 'Playground',
      url: '#'
    },
    {
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#'
        },
        {
          title: 'Explorer',
          url: '#'
        },
        {
          title: 'Quantum',
          url: '#'
        }
      ],
      title: 'Models',
      url: '#'
    },
    {
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#'
        },
        {
          title: 'Get Started',
          url: '#'
        },
        {
          title: 'Tutorials',
          url: '#'
        },
        {
          title: 'Changelog',
          url: '#'
        }
      ],
      title: 'Documentation',
      url: '#'
    },
    {
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ],
      title: 'Settings',
      url: '#'
    }
  ],
  teams: [
    {
      logo: GalleryVerticalEnd,
      name: 'Acme Inc',
      plan: 'Enterprise'
    },
    {
      logo: AudioWaveform,
      name: 'Acme Corp.',
      plan: 'Startup'
    },
    {
      logo: Command,
      name: 'Evil Corp.',
      plan: 'Free'
    }
  ],
  user: {
    avatar: '/avatars/shadcn.jpg',
    email: 'm@example.com',
    name: 'shadcn'
  }
}

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible='icon' {...props}>
    <SidebarHeader>
      <TeamSwitcher teams={data.teams} />
      <SidebarGroup className='py-0 group-data-[collapsible=icon]:hidden'>
        <SidebarGroupContent>
          <form className='relative'>
            <Label className='sr-only' htmlFor='search'>
              Search
            </Label>
            <SidebarInput className='pl-8' id='search' placeholder='Search the docs...' />
            <Search className='pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none' />
          </form>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.map(item => (
            <Collapsible
              asChild
              className='group/collapsible'
              defaultOpen={item.isActive}
              key={item.title}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon ? <item.icon /> : null}
                    <span>{item.title}</span>
                    <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map(subItem => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
)
