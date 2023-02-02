import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"

import Sidebar from "@/components/app/sidebar"
import NewBookmark from "@/components/bookmarks/new-bookmark"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

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
          <NewBookmark
            collections={
              collections.map(({ name, id }) => ({
                name,
                id
              })) ?? []
            }
          />
        </header>
        <section className="h-full">{children}</section>
      </main>
    </div>
  )
}
