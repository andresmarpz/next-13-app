import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export async function withAuth() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/api/auth/signin")

	return session;
}
