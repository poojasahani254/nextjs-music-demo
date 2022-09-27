import { validateRoute } from "../../../helper/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, userData) => {
    const { name, songs, isUpdate } = req.body;

    try {
      let listMutation;
      if (isUpdate?.id) {
        listMutation = await prisma.playlist.update({
          where: {
            id: isUpdate.id,
          },
          data: {
            user: {
              connect: { id: userData.id },
            },
            songs: {
              connect: songs.map((song: any) => ({
                id: song.id,
              })),
            },
          },
        });
      } else {
        listMutation = await prisma.playlist.create({
          data: {
            name: name,
            user: {
              connect: { id: userData.id },
            },
            songs: {
              connect: songs.map((song: any) => ({
                id: song.id,
              })),
            },
          },
        });
      }

      if (listMutation) {
        return res.json({ message: "Playlist Mutated successfully" });
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
