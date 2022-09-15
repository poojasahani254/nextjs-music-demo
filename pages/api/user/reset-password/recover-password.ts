import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync();

  try {
    let user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: bcrypt.hashSync(password, salt),
      },
    });

    if (user) {
      return res.json({ message: "Password changed successfully" });
    } else {
      res.status(500);
      res.json({ error: "Internal server error !" });
      return;
    }
  } catch (e) {
    res.status(401);
    res.json({ error: "Provided email doesn't exist with in our system !" });
    return;
  }
};
