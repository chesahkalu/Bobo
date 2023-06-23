'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Bobo',
  description: 'Built for Babies. Made for Parents.',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className={inter.className}>
      <Nav />
      {children}
      <Footer />
      </body>
    </html>
  )
}
