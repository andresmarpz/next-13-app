import { NextApiRequest, NextApiResponse } from "next"
import { getFavicons } from "@andresmarpz/favicons"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/prisma/client"

const bookmarkSchema = z.object({
  title: z.string().optional(),
  url: z.string().url(),
  description: z.string().optional(),
  image: z.string().optional(),
  collectionId: z.number()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

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
		console.log(input)

    const page = await fetch(url)
    const html = await page.text()
    const pageTitle = html.match(/<title>(.*?)<\/title>/)?.[1]
    const pageDescription = html.match(
      /<meta.*?name="description".*?content="(.*?)".*?>/
    )?.[1]

    const favicons = await getFavicons(url)
    const best = favicons.sort((a, b) => b.size - a.size)[0]

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
        title: input.title ?? pageTitle ?? undefined,
        description: input.description ?? pageDescription ?? undefined,
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
