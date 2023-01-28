import "../styles/globals.css"
import { Inter } from "@next/font/google"

import { Providers } from "@/components/global/Providers"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
