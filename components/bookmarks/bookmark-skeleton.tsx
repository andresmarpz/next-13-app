"use client"

import { motion } from "framer-motion"

export default function BookmarkSkeleton() {
  return (
    <motion.li animate={{
			opacity: [0, 1]
		}} className="h-[72px] w-full animate-pulse rounded-md bg-gray-200 p-4" />
  )
}
