import { Bookmark } from "@prisma/client"

interface Props {
  bookmark: Bookmark
}

export default function BookmarkItem({
  bookmark: { title, description, url, image, id }
}: Props) {
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer noopener">
        {title}
      </a>
    </li>
  )
}
