import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"

import { cn } from "@/lib/utils"
import CollectionItem from "@/components/app/sidebar/CollectionItem.client"
import { Icons } from "@/components/ui/Icons"
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
          <Link href="/app">
            <h1 className="text-xl font-bold">linky</h1>
          </Link>
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
        <div className="flex flex-col gap-4 p-1">
          <Input type="text" placeholder="Search" />
          <Link href="/app/all">
            <button
              className={cn(
                "flex w-full items-center gap-2 px-2 py-1",
                " rounded-md border bg-black font-medium text-white shadow-sm"
              )}
            >
              <Icons.target color="#FFF" size={16} />
              All bookmarks
            </button>
          </Link>
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
