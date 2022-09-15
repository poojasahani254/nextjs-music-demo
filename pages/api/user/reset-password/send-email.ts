import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import nodemailer from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    let otp = Math.random().toString().substring(2, 8);
    let otpExpire = new Date(Date.now() + 1000 * 60 * 5);

    if (!user) {
      res.status(401);
      res.json({ error: "Provided email doesn't exist with in our system !" });
      return;
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetToken: otp,
        resetTokenExpire: otpExpire,
      },
    });

    user.resetToken = otp;
    user.resetTokenExpire = otpExpire;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "poojasahanidev08@gmail.com",
        pass: "ywucyfgwjqhtujuo",
      },
      secure: true,
    });

    const mailData = {
      from: "demo@demo.com",
      to: email,
      subject: `Reset Password OTP from musicHigh`,
      text: `Please reset your using this ${req.body.otp}`,
      html: `
            <!DOCTYPE html> 
            <html> 
              <head>
                 <meta charset="utf-8"> 
                 <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                 <title>Welcome Email</title> 
              </head> 
              <body> 
                 <h2>Dear Sir/Madam, </h2>
                 <p>Your one time password(OTP) for reset you account is:</p> 
                 <p><b>${otp}</b></p> 
                 <p>You OTP will expire in 5 min.</p> 
                 <p>Do not share your OTP with anyone.</p> 
                 <div>Warm Regrads,<br />MusicHigh Team </div>
              </body> 
           </html>
        `,
    };

    transporter.sendMail(mailData, (err: any) => {
      if (err) {
        res.status(500);
        return res.json({ error: "Server Error !" });
      } else return res.json(user);
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "Provided email doesn't exist with in our system !" });
    return;
  }
};
