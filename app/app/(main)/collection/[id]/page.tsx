import BookmarkList from "@/components/app/main/BookmarkList"

interface Props {
  params: {
    id: number
  }
}

export default async function CollectionById({ params }: Props) {
  if (!params.id || !Number(params.id)) return <div>Invalid collection id</div>

  const bookmarks = await prisma?.bookmark.findMany({
    where: {
      collection: {
				id: Number(params.id)
			}
    }
  })

  return <BookmarkList bookmarks={bookmarks ?? []} />
}
