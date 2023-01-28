"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

interface Props {
  name: string
  id: number
}

export default function CollectionItem({ name, id }: Props) {
  const pathname = usePathname()
  const isActive = pathname === `/app/collection/${id}`

  return (
    <li>
      <Link
        className={cn(
          "flex items-center gap-2 font-medium",
          "rounded px-2 py-1",
          "hover:bg-gray-100",
          isActive && "bg-gray-100"
        )}
        href={`/app/collection/${id}`}
      >
        <Icons.hash size={16} />
        {name}
      </Link>
    </li>
  )
}
