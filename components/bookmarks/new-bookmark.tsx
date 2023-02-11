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
import { urlRegex } from "@/lib/validation"
import { transformURL } from "@/lib/transform-url"

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
  const [open, setOpenState] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
    getValues
  } = useForm()

  console.log(getValues("collection"))

  const setOpen = (open: boolean) => {
    if (open === false) {
      clearErrors()
      reset()
    }

    setOpenState(open)
  }

  const { isLoading, execute } = useAsync<Bookmark>({
    refresh: true
  })

  const onSubmit = async (data: FieldValues) => {
    const { title, url, description, image, collection } = data

    const transformedURL = transformURL(url)

    await execute(
      createBookmark({
        title: title !== "" ? title : undefined,
        url: transformedURL,
        description: description !== "" ? description : undefined,
        image,
        collectionId: Number(collection)
      })
    )

    reset({
      data: {
        title: "",
        url: "",
        description: "",
        collection: undefined
      }
    })
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
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                autoComplete="off"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-gray-500">
                  {String(errors.title.message)}
                </span>
              )}
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
                  },
                  validate: {
                    isUrl: (value) => {
                      return urlRegex.test(value) ? true : "Invalid URL"
                    }
                  }
                })}
              />
              {errors.url && (
                <span className="text-sm text-gray-500">
                  {String(errors.url.message)}
                </span>
              )}
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
                defaultValue={undefined}
                {...register("collection", {
                  required: {
                    value: true,
                    message: "This field is required"
                  },
                  validate: {
                    isCollection: (value) => {
                      return collections.some(
                        (collection) => collection.id.toString() === value
                      )
                        ? true
                        : "Invalid collection"
                    }
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
                <span className="text-sm text-gray-500">
                  {String(errors.collection.message)}
                </span>
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
