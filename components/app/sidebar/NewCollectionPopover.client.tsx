"use client"

import React, { useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/Icons"
import Input from "@/components/ui/Input"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (name: string) => Promise<any>
  clear?: boolean
  onTriggerClick?: () => void
}

export default function NewCollectionPopover({
  onTriggerClick,
  onSubmit,
  clear = true
}: Props) {
  const [name, setName] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name) return

    await onSubmit(name)
    if (clear) setName("")
  }

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-2 py-1",
            " bg-black rounded shadow-sm border text-white font-medium"
          )}
          onClick={onTriggerClick}
        >
          <Icons.listPlus color="#FFF" size={16} />
          New collection
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          collisionPadding={16}
          className={cn(
            "bg-white p-2",
            "rounded-md shadow-md border-gray-300 border"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label
                className="text-gray-900 text-sm"
                htmlFor="collection-name"
              >
                Name
              </label>
              <Input
                name="collection-name"
                placeholder="misc"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </div>
            <button>Create</button>
          </form>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
