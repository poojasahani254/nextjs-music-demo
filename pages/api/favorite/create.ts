import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    const { songId } = req.body;
    let favSong;

    try {
      favSong = await prisma.favorite.create({
        data: {
          user: {
            connect: { id: user?.id },
          },
          songId: +songId,
        },
      });
    } catch (e) {
      return res.status(401).json({ error: "Server error occurred" });
    }

    return res.json({ favSong });
  }
);
