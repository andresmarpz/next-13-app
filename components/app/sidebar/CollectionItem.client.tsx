"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/Icons"

interface Props {
  name: string
  id: number
}

export default function CollectionItem({ name, id }: Props) {
  return (
    <li>
      <Link
        className={cn(
          "flex items-center gap-2 font-medium",
          "rounded px-2 py-1",
          "hover:bg-gray-100"
        )}
        href={`/app/collection/${id}`}
      >
        <Icons.hash size={16} />
        {name}
      </Link>
    </li>
  )
}
