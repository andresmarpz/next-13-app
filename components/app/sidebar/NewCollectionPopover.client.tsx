"use client"

import React, { useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Input from "@/components/ui/input"

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
        <Button onClick={onTriggerClick}>
          <Icons.listPlus className="mr-2 fill-black dark:fill-white" size={16} />
          New collection
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          collisionPadding={16}
          className={cn(
            "bg-white p-2",
            "rounded-md border border-gray-300 shadow-md"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label
                className="text-sm text-gray-900"
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
