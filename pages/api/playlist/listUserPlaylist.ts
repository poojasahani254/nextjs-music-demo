import { validateRoute } from "../../../helper/auth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../helper/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, userData) => {
    try {
      let playlists = await prisma.playlist.findMany({
        where: { userId: +userData.id },
      });

        if (playlists) {
            return res.json({ playlists: playlists });
        } else {
            res.status(500);
            res.json({ error: "Internal server error !" });
            return;
        }

    } catch (e) {
      res.status(401);
      res.json({ error: "Something gone wrong here !" });
      return;
    }
  }
);
