import prisma from "@/prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) return res.status(401).json({ error: "Unauthorized" })

    const { id } = req.query

    const deleted = await prisma.bookmark.deleteMany({
      where: {
        id: Number(id),
        user: {
          email: session.user?.email
        }
      }
    })

    if (deleted.count === 0) return res.status(404).json({ error: "Not Found" })

    res.status(200).json({ message: "Deleted" })
  }
}
