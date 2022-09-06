import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (
  handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>, arg2: User) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.DEMO_ACCESS_TOKEN;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "test@123");
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error("User not exists !");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};

export const validateToken = (token: any) => {
  return jwt.verify(token, "test@123");
};
