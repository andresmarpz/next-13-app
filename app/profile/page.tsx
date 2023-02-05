import { withAuth } from "@/lib/with-auth"

export default async function Profile() {
  const session = await withAuth()

  return (
    <main>
      <h1>Profile</h1>
    </main>
  )
}
