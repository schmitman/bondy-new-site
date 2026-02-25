import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bondy - The standard for technical hiring',
  description: 'We don\'t send you candidates. We send you the right one. Bondy has been placing senior engineers at high-growth tech companies since 2008.',
  openGraph: {
    title: 'Bondy - The standard for technical hiring',
    description: 'We don\'t send you candidates. We send you the right one.',
    url: 'https://newbondy.wearebondy.com',
    siteName: 'Bondy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bondy - The standard for technical hiring',
    description: 'We don\'t send you candidates. We send you the right one.',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
