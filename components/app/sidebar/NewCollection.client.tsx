"use client"

import React, { useState } from "react"
import useAsync from "@/hooks/use-async"
import { Collection } from "@prisma/client"

import NewCollectionPopover from "./NewCollectionPopover.client"

export default function NewCollection() {
  const [open, setOpen] = useState(false)

  useAsync<Collection | undefined>({ refresh: true })

  const onSubmit = async (name: string) => {
    setOpen(false)
    console.log(name)
  }

  return (
    <NewCollectionPopover open={open} setOpen={setOpen} onSubmit={onSubmit} />
  )
}
