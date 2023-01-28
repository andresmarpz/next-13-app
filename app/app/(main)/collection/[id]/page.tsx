interface Props {
  params: {
    id: number
  }
}

export default function CollectionById({ params }: Props) {
  if (!params.id || !Number(params.id)) return <div>Invalid collection id</div>

  return <div>{params.id}</div>
}
