import { PropsWithChildren } from "react"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"

import AddBookmark from "@/components/app/AddBookmark.client"

export default async function BookmarksTemplate({
  children
}: PropsWithChildren) {
  const session = await unstable_getServerSession(authOptions)

  const collections = await prisma?.collection.findMany({
    where: {
      user: {
        email: session?.user?.email!
      }
    }
  })

  return (
    <>
      <header className="flex justify-between p-4">
        <span>
        </span>
        <AddBookmark collections={collections ?? []} />
      </header>
      <section>{children}</section>
    </>
  )
}
