import NextConnect from "next-connect";
// import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const handler = NextConnect()
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.send("Hello world");
  })
  .post((req: NextApiRequest, res: NextApiResponse) => {
    res.json({ hello: "world" });
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    res.end("hello");
  });

export default handler