"use client"

import Image from "next/image"
import Link from "next/link"
import { LogOut, Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../primitives/dropdown"

export default function UserDropdown() {
  const { data, status } = useSession()

  if (status === "loading" || !data)
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-100"
          src={data.user?.image!}
          alt={data.user?.name!}
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>
          <Link href="/profile" className="flex w-full">
            <User className="mr-2" size={16} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="flex w-full">
            <Settings className="mr-2" size={16} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2" size={16} /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
