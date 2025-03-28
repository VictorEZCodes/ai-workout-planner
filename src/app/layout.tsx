import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { UserProvider } from '../contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Workout Planner',
  description: 'Get personalized workout plans and nutrition advice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </UserProvider>
    </ClerkProvider>
  )
}