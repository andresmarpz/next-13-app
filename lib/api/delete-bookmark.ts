import { Bookmark } from "@prisma/client"

export default async function deleteBookmark(id: Bookmark["id"]) {
  const res = await fetch(`/api/bookmark/delete?id=${id}`, {
    method: "DELETE"
  })

  return res.ok
}
