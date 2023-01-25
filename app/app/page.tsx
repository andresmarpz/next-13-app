import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function App() {
  return (
    <>
      <div>Some bookmarks!</div>
    </>
  )
}
