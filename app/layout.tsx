import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';

const poppins = Poppins({ subsets: ['latin'],
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
    <html lang="da">
      <body className={`${poppins.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='flex-grow'>{children}</main>
          <Footer/>
        </div>
        </body>
    </html>
  )
}
