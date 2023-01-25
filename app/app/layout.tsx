import Sidebar from '@/components/app/sidebar/Sidebar.server'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await unstable_getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  return (
    <div className="grid grid-cols-[0.3fr_0.7fr]">
      {/* @ts-expect-error Server Component */}
      <Sidebar session={session} />
      <main>{children}</main>
    </div>
  )
}
