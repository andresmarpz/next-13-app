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
  collections: Collection[]
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

export default function AddBookmark({ collections }: Props) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
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
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                type="text"
                id="url"
                autoComplete="off"
                {...register("url", { required: true })}
              />
              {errors.url && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                type="text"
                id="tags"
                autoComplete="off"
                {...register("tags")}
              />
              {errors.tags && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                autoComplete="off"
                {...register("description")}
              />
              {errors.description && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="collection">Collection</Label>
              <SelectField
                onValueChange={(value) => setValue("collection", value)}
                {...register("collection", { required: true })}
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
