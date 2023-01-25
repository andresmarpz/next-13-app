import { Bookmark } from "@prisma/client"

import BookmarkItem from "./BookmarkItem"

interface Props {
  bookmarks: Bookmark[]
}

export default function BookmarkList({ bookmarks }: Props) {
  return (
    <ul>
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  )
}
