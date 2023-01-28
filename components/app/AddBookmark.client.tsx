"use client"

import { Collection } from "@prisma/client"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function AddBookmark({ collections }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          New Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new bookmark</DialogTitle>
        <DialogDescription>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                <Select {...register("collection")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem
                        key={collection.id}
                        value={collection.id.toString()}
                      >
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
