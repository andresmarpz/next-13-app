import "../styles/globals.css"
import { Inter } from "@next/font/google"

import { Providers } from "@/components/global/Providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
