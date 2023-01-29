import { Bookmark } from "@prisma/client"

export default async function createBookmark({
  title,
  url,
  description,
  image,
  collectionId
}: Pick<Bookmark, "title" | "url" | "description" | "image" | "collectionId">) {
  const res = await fetch("/api/bookmark/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      url,
      description,
      image,
      collectionId
    })
  }).then((res) => res.json())

  return res as Bookmark
}
