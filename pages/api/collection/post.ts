import prisma from "@/prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    try {
      const { name } = JSON.parse(req.body)

      const collection = await prisma.collection.create({
        data: {
          name,
          user: {
            connect: {
              email: session!.user?.email!
            }
          }
        }
      })

      return res.status(200).json({ collection })
    } catch (error) {
      return res.status(400).json({ error: "Bad request" })
    }
  }
}
