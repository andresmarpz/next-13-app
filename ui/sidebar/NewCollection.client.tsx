'use client'

import useAsync from '@/hooks/use-async'
import createCollection from '@/lib/api/create-collection'
import { Bookmark, Collection } from '@prisma/client'
import React, { FormEvent, useCallback, useState } from 'react'

export default function NewCollection() {
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(false)

  const { data, isLoading, hasError, execute } = useAsync<
    Collection | undefined
  >(() => createCollection(name), { refresh: true })

  const consumeRef = useCallback((node: HTMLInputElement) => {
    if (node) node.focus()
  }, [])

  const toggleEditing = () => setEditing((prev) => !prev)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name) return setEditing(false)

    const response = await execute()
		console.log(response);
  }

  return editing ? (
    <form onSubmit={handleSubmit}>
      <input
        ref={consumeRef}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={toggleEditing}
      />
    </form>
  ) : (
    <button onClick={toggleEditing}>Create collection</button>
  )
}
