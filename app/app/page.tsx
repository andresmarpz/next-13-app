import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "@/prisma/client"

import BookmarkList from "@/components/bookmarks/bookmark-list"

export default async function App() {
  const session = await getServerSession(authOptions)

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      user: {
        email: session?.user?.email
      }
    },
		orderBy: {
			createdAt: "desc"
		}
  })

  if (!bookmarks || !bookmarks.length)
    return (
      <h1 className="mx-auto mt-10 w-fit text-center text-2xl font-bold">
        No bookmarks found. Add some!
      </h1>
    )

  return (
    <>
      <BookmarkList bookmarks={bookmarks} />
    </>
  )
}
