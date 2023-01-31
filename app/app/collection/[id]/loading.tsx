import { Bookmark } from "@prisma/client"

import BookmarkList from "@/components/bookmarks/bookmark-list"

export default function Loading() {
  const bookmarks = Array.from({ length: 7 }, () => undefined)
  return (
    <BookmarkList skeleton bookmarks={bookmarks as unknown as Bookmark[]} />
  )
}
