"use client"

import Image from "next/image"
import { Bookmark } from "@prisma/client"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface Props {
  bookmark: Pick<Bookmark, "title" | "description" | "url" | "icon" | "id">
  index: number
}

export default function BookmarkItem({
  bookmark: { title, description, url, icon, id },
  index
}: Props) {
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
      <a
        className="flex w-full gap-4 p-4"
        href={url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex items-start">
          {icon && (
            <div className="rounded border p-1">
              <Image
                src={icon}
                alt=""
                className="rounded"
                width={24}
                height={24}
                unoptimized
              />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{url}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </a>
    </motion.li>
  )
}
