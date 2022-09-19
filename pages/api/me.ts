import { validateRoute } from "../../helper/auth";
import prisma from "../../helper/prisma";

export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.json({ ...user, playlistsCount });
});
