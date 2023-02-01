"use client"

import React, { useState } from "react"
import useAsync from "@/hooks/use-async"
import { Bookmark, Collection } from "@prisma/client"
import { Plus } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"

import createBookmark from "@/lib/api/create-bookmark"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "../primitives/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../primitives/select"
import { Button } from "../ui/button"
import Input from "../ui/input"
import Label from "../ui/label"

interface Props {
  collections: Pick<Collection, "name" | "id">[]
}

const SelectField = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Select>
>(({ children, ...props }, ref) => {
  return (
    <Select {...props}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder="Select a collection" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
})
SelectField.displayName = "SelectField"

export default function NewBookmark({ collections }: Props) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors
  } = useForm()

  const { isLoading, execute } = useAsync<Bookmark>({
    refresh: true
  })

  const onSubmit = async (data: FieldValues) => {
    const { title, url, description, image, collection } = data

    await execute(
      createBookmark({
        title,
        url,
        description,
        image,
        collectionId: Number(collection)
      })
    )

    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value === false) clearErrors()
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" disabled={!collections.length}>
          <Plus className="mr-2 h-4 w-4" />
          New Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new bookmark</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                type="text"
                id="title"
                autoComplete="off"
                {...register("title", {
                  required: {
                    value: true,
                    message: "This field is required"
                  }
                })}
              />
              {errors.title && <span>{String(errors.title.message)}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="url">URL *</Label>
              <Input
                type="text"
                id="url"
                autoComplete="off"
                {...register("url", {
                  required: {
                    value: true,
                    message: "This field is required"
                  }
                })}
              />
              {errors.url && <span>{String(errors.url.message)}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                autoComplete="off"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="collection">Collection</Label>
              <SelectField
                onValueChange={(value) => setValue("collection", value)}
                {...register("collection", {
                  required: {
                    value: true,
                    message: "This field is required"
                  }
                })}
              >
                {collections.map((collection) => (
                  <SelectItem
                    key={collection.id}
                    value={collection.id.toString()}
                  >
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectField>
              {errors.collection && (
                <span>{String(errors.collection.message)}</span>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading.." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
