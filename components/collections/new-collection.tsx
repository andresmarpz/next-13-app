"use client"

import { useState } from "react"
import useAsync from "@/hooks/use-async"
import { Collection } from "@prisma/client"
import { Plus } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"

import createCollection from "@/lib/api/create-collection"
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover"
import { Button } from "../ui/button"
import Input from "../ui/input"
import Label from "../ui/label"

export default function NewCollection() {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { isLoading, execute } = useAsync<Collection>({ refresh: true })

  const onSubmit = async (data: FieldValues) => {
    const res = await execute(createCollection(data.name))

    if (res) {
      reset()
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default">
          <Plus size={16} className="mr-2" />
          New collection
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input autoComplete="off" id="name" {...register("name")} />
            {errors.name && <p>{String(errors.name.message)}</p>}
          </div>
          <div className="flex justify-end">
            <Button
              variant="default"
              disabled={isLoading || !!errors.name}
              type="submit"
            >
              {isLoading ? "Loading.." : "Create"}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
