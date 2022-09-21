import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../helper/auth";
import prisma from "../../../helper/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, userData) => {
    const {
      firstName,
      lastName,
      address,
      zipCode,
      country,
      state,
      contactNumber,
      city,
      email,
    } = req.body.user;

    try {
      let user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          firstName,
          lastName,
          address,
          zipCode,
          country,
          state,
          contactNumber,
          city,
        },
      });

      if (user) {
        return res.json({ message: "Profile updated successfully" });
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
