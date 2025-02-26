import '@a/ui/globals.css'

import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { cn } from '@a/ui'

import { env } from '~/env'
import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  description: 'Simple monorepo with shared backend for web & mobile apps',
  metadataBase: new URL(env.VERCEL_ENV === 'production' ? 'https://...' : 'http://localhost:3000'),
  openGraph: {
    description: 'Simple monorepo with shared backend for web & mobile apps',
    siteName: '',
    title: '',
    url: 'https://t.vercel.app'
  },
  title: '',
  twitter: {
    card: 'summary_large_image',
    creator: '@',
    site: '@'
  }
}

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => (
  <html lang='en' suppressHydrationWarning>
    <body
      className={cn(
        'bg-background text-foreground min-h-screen font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable
      )}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
