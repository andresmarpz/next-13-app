'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function ClientProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
