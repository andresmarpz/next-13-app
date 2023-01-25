import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"

import Sidebar from "@/components/app/sidebar/Sidebar.server"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await unstable_getServerSession(authOptions)

  if (!session) redirect("/api/auth/signin")

  return (
    <div className="grid grid-cols-[minmax(225px,_0.3fr)_1fr]">
      {/* @ts-expect-error Server Component */}
      <Sidebar session={session} />
      <main>{children}</main>
    </div>
  )
}
