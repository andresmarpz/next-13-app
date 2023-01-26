import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) return res.status(401).json({ error: "Unauthorized" })

  try {
    const { title, description, url, collections } = JSON.parse(req.body)

    const userCollections = await prisma?.collection.findMany({
      where: {
        user: {
          email: session!.user?.email!
        }
      }
    })

    // if collections (list of collection ids) contains a collection id that is not in userCollections, throw error
    if (
      collections.some(
        (collection: number) =>
          !userCollections?.some(
            (userCollection) => userCollection.id === collection
          )
      )
    ) {
      return res.status(401).json({
        error: "Can not add bookmark to collection that does not belong to user"
      })
    }

    const bookmark = await prisma?.bookmark.create({
      data: {
        title,
        description,
        url,
        image: "asdasdass",
        collections,
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
    res.status(400).json({
      error
    })
  }
}
