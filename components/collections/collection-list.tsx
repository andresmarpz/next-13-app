import { Collection } from "@prisma/client"

import CollectionItem from "./collection-item"
import NewCollection from "./new-collection"

interface Props {
  collections: Collection[]
}

export default function CollectionList({ collections }: Props) {
  return (
    <ul className="flex flex-col gap-1 p-1">
      <NewCollection />
      {collections?.map(({ name, id }, index) => (
        <CollectionItem key={"col" + id} name={name} id={id} index={index} />
      ))}
    </ul>
  )
}
