import { Collection } from "@prisma/client"

import { api } from "../fetch-endpoint"

export default async function createCollection(name: Collection["name"]) {
  return api<Collection>("/collection/post", {
    method: "POST",
    body: JSON.stringify({ name })
  })
}
