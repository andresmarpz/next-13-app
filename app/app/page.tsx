import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function App() {
  const session = await unstable_getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  const bookmarks = await prisma?.bookmark.findMany({
    where: {
      user: {
        email: session!.user?.email
      }
    }
  })

  return (
    <>
      <div>Hello, from the server! {session!.user?.name}</div>
      <div>
        Bookmarks:
        <ul>
          {bookmarks?.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.title}
              {bookmark.url}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
