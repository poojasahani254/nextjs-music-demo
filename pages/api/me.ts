import { validateRoute } from "../../helper/auth";
import prisma from "../../helper/prisma";

export default validateRoute(async (req, res, user) => {
  const data = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  let finalizedData = Object.entries({ ...user, ...data })
    .filter(([key, _]) => key !== "password")
    .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});

  return res.json(finalizedData);
});
