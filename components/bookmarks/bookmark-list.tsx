import useAsync from "@/hooks/use-async"
import { Bookmark } from "@prisma/client"

import BookmarkItem from "./bookmark-item"
import BookmarkSkeleton from "./bookmark-skeleton"

interface Props {
  bookmarks: Bookmark[]
  skeleton?: boolean
}

export default function BookmarkList({ bookmarks, skeleton = false }: Props) {
  return (
    <ul className="flex flex-col gap-4 p-4">
      {skeleton &&
        bookmarks.map((_, index) => (
          <BookmarkSkeleton key={"dummy-b" + index} />
        ))}
      {!skeleton &&
        bookmarks.map(({ title, description, url, icon, id }, index) => (
          <BookmarkItem
            key={id}
            bookmark={{
              title,
              description,
              url,
              icon,
              id
            }}
            index={index}
          />
        ))}
    </ul>
  )
}
