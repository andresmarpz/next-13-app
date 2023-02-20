"use client"

import Image from "next/image"
import { Bookmark } from "@prisma/client"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "../primitives/context-menu"
import { Pencil, Trash } from "lucide-react"
import useAsync from "@/hooks/use-async"
import deleteBookmark from "@/lib/api/delete-bookmark"
import Spinner from "../ui/spinner"
import { prettifyURL } from "@/lib/transform-url"
import clsx from "clsx"

interface Props {
  bookmark: Pick<Bookmark, "title" | "description" | "url" | "icon" | "id">
  index: number
}

export default function BookmarkItem({
  bookmark: { title, description, url, icon, id },
  index
}: Props) {
  const { isLoading: isDeleting, execute } = useAsync({ refresh: true })

  async function onDelete() {
    await execute(deleteBookmark(id))
  }

  return (
    <motion.li
      animate={{
        translateY: [32, 0],
        opacity: [0, 1]
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05
      }}
      className={cn(
        "h-fit w-full rounded-md border shadow-sm",
        "transition-border hover:border hover:border-gray-500 hover:shadow"
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <a
            className="flex w-full gap-4 p-4"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="flex min-w-[32px] items-start">
              <div
                className={clsx(
                  "h-6 w-6 rounded border p-1",
                  !icon ? "bg-slate-500" : "bg-white dark:bg-gray-900"
                )}
              >
                {icon && (
                  <Image
                    src={icon}
                    alt=""
                    className="rounded"
                    width={24}
                    height={24}
                    unoptimized
                  />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{prettifyURL(url)}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </a>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem onClick={onDelete}>
            {isDeleting ? <Spinner /> : <Trash className="mr-2 h-4 w-4" />}
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </motion.li>
  )
}
