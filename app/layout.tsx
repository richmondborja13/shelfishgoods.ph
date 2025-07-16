import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shelf-ish Goods - Your Complete Business Solution',
  description: 'Professional store vendor solutions for businesses of all sizes. Streamline your operations, boost efficiency, and grow your business with our comprehensive services.',
  keywords: 'store vendor, business solutions, retail management, vendor services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <main className="min-h-screen bg-white">
        {children}
        </main>
      </body>
    </html>
  )
}
