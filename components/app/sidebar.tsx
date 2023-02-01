import Link from "next/link"
import { Session } from "next-auth"

import CollectionList from "@/components/collections/collection-list"
import ToggleTheme from "@/components/toggle-theme"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Input from "@/components/ui/input"
import UserDropdown from "./user-dropdown"

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
    <aside className="border-r border-gray-300 p-3">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link href="/app">
            <h1 className="text-xl font-bold">linky</h1>
          </Link>
          <span className="flex items-center gap-3">
            <ToggleTheme />
            <UserDropdown />
          </span>
        </div>
        <div className="flex flex-col gap-4 p-1">
          <Input type="text" placeholder="Search" />
          <Link href="/app">
            <Button variant="default" className="w-full">
              <Icons.target
                className="mr-2 fill-black dark:fill-white"
                size={16}
              />
              All bookmarks
            </Button>
          </Link>
        </div>
      </section>
      {/* Collections */}
      <section className="mt-4">
        <h2 className="font-bold">Collections</h2>
        <CollectionList collections={collections ?? []} />
      </section>
    </aside>
  )
}
