// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'Gaze & Go Payment System',
//   description: 'Revolutionary payment system for MSMEs',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PayEasy - Simple Payment App',
  description: 'Easy payment app for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="max-w-md mx-auto bg-white min-h-screen"> */}
        <div className="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
