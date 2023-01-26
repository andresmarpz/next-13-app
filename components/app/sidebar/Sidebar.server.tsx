import Image from "next/image"
import { Session } from "next-auth"

import CollectionItem from "@/components/app/sidebar/CollectionItem.client"
import Input from "@/components/ui/Input"
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
    <aside className="p-3">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">linky</h1>
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
        <div className="p-1">
          <Input type="text" placeholder="Search" />
        </div>
      </section>
      {/* Collections */}
      <section className="mt-4">
        <h2 className="font-bold">Collections</h2>
        <ul className="flex flex-col gap-1 p-1">
          <NewCollection />
          {collections?.map(({ name, id }) => (
            <CollectionItem key={"col" + id} name={name} id={id} />
          ))}
        </ul>
      </section>
    </aside>
  )
}
