import { NextApiResponse, NextApiRequest } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../helper/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "test@123",
    { expiresIn: "24h" }
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
};
