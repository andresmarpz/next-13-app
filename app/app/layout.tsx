import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"

import Sidebar from "@/components/app/sidebar"
import NewBookmark from "@/components/bookmarks/new-bookmark"
import prisma from "@/prisma/client"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await unstable_getServerSession(authOptions)

  if (!session) redirect("/api/auth/signin")

  const collections = await prisma.collection.findMany({
    where: {
      user: {
        email: session?.user?.email
      }
    }
  })

  return (
    <div
      className="grid h-screen grid-cols-[minmax(225px,_300px)_1fr]"
      suppressHydrationWarning
    >
      {/* @ts-expect-error Server Component */}
      <Sidebar session={session} />
      <main className="flex h-full flex-col">
        <header className="flex justify-between p-4">
          <span></span>
          <NewBookmark collections={collections ?? []} />
        </header>
        <section className="h-full">{children}</section>
      </main>
    </div>
  )
}
