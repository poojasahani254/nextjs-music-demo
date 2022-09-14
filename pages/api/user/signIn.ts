import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        "test@123",
        {
          expiresIn: "24h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("DEMO_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.json(user);
    }
  } catch (e) {
    res.status(401);
    res.json({ error: "Invalid credential provided !" });
    return;
  }
};
