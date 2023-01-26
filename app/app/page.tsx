import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"

import BookmarkList from "@/components/app/main/BookmarkList"

export default async function App() {
  const session = await unstable_getServerSession(authOptions)

  const bookmarks = await prisma?.bookmark.findMany({
    where: {
      user: {
        email: session?.user?.email
      }
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
