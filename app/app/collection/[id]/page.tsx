import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/prisma/client"
import { getServerSession } from "next-auth"

import BookmarkList from "@/components/bookmarks/bookmark-list"

interface Props {
  params: {
    id: string
  }
}

export default async function CollectionById({ params }: Props) {
  if (!params.id || isNaN(parseInt(params.id)))
    return <div>Invalid collection id</div>

  const session = await getServerSession(authOptions)

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      collection: {
        id: parseInt(params.id)
      },
      user: {
        email: session?.user?.email
      }
    }
  })

  return <BookmarkList bookmarks={bookmarks ?? []} />
}
