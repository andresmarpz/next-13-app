'use client'

import useAsync from '@/hooks/use-async'
import createCollection from '@/lib/api/create-collection'
import { Bookmark, Collection } from '@prisma/client'
import React, { FormEvent, useCallback, useState } from 'react'
import NewCollectionPopover from './NewCollectionPopover.client'

export default function NewCollection() {
  const [open, setOpen] = useState(false)

  const { data, isLoading, hasError, execute } = useAsync<
    Collection | undefined
  >(undefined, { refresh: true })

  const onSubmit = async (name: string) => {
		setOpen(false);
		console.log(name)
  }

  return (
    <NewCollectionPopover open={open} setOpen={setOpen} onSubmit={onSubmit} />
  )
}
