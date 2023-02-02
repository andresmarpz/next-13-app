import { NextApiRequest, NextApiResponse } from "next"
import { getFavicons } from "@andresmarpz/favicons"
import { unstable_getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/prisma/client"

const bookmarkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
  image: z.string().optional(),
  collectionId: z.number()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) return res.status(401).json({ error: "Unauthorized" })

  try {
    const { title, description, url, image, collectionId } = JSON.parse(
      req.body
    )

    const input = {
      title,
      description,
      url,
      image,
      collectionId: Number(collectionId)
    }
    bookmarkSchema.parse(input)

    const favicons = await getFavicons(url)
    const best = favicons.sort((a, b) => b.size - a.size)[0]
		console.log(best)

    await prisma.collection.findFirstOrThrow({
      where: {
        id: input.collectionId,
        user: {
          email: session.user?.email!
        }
      }
    })

    const bookmark = await prisma.bookmark.create({
      data: {
        title: input.title,
        description: input.description,
        url: input.url,
        image: input.image,
				icon: best.url,
        collection: {
          connect: {
            id: input.collectionId
          }
        },
        user: {
          connect: {
            email: session.user?.email!
          }
        }
      }
    })

    res.status(200).json({
      bookmark
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      error
    })
  }
}
