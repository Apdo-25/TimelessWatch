import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const inter = Poppins({ subsets: ['latin'],
  weight: ["400", "700",],
  display: 'swap',
 })

export const metadata: Metadata = {
  title: 'Timeless Watch',
  description: 'Ecommerce Watch App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="dk">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
