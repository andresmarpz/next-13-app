import Link from "next/link"

interface Props {
  name: string
  id: number
}

export default function CollectionItem({ name, id }: Props) {
  return (
    <li>
      <Link href={`/app/collection/${id}`}>{name}</Link>
    </li>
  )
}
