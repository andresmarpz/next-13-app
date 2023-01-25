import Image from "next/image"
import CollectionItem from "@/ui/sidebar/CollectionItem.server"
import { Session } from "next-auth"

import NewCollection from "./NewCollection.client"

interface Props {
  session: Session
}

export default async function Sidebar({ session }: Props) {
  const collections = await prisma?.collection.findMany({
    where: {
      user: {
        email: session.user?.email
      }
    }
  })

  return (
    <aside className="p-2">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">linky</h1>
        <button>
          <Image
            className="rounded-full"
            src={session.user?.image!}
            alt={session.user?.name!}
            width={32}
            height={32}
          />
        </button>
      </div>
      {/* Search */}
      <input type="text" placeholder="Search" />
      {/* Collections */}
      <ul>
        <NewCollection />
        {collections?.map(({ name, id }) => (
          <CollectionItem key={"col" + id} name={name} id={id} />
        ))}
      </ul>
    </aside>
  )
}
