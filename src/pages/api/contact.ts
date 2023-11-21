// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type ContactForm = {
  status: boolean;
  statusText: string;
  message: string;
};

function getClientIp(req : NextApiRequest)
{
  let ip;

  if (
    req.headers["x-forwarded-for"] &&
    typeof req.headers["x-forwarded-for"] === "string"
  ) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.headers["x-real-ip"];
  } else {
    ip = req.connection.remoteAddress;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactForm>
) {
  const data = req.body;
  const ip = getClientIp(req);

  let nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });

  const mailBody =
    `<div>` +
    `<strong>Name:</strong> ${data.name}<br />` +
    `<strong>Email:</strong> ${data.email}<br />` +
    `<strong>Subject:</strong> ${data.subject}<br />` +
    `<strong>Message:</strong><br /> ${data.message}<br /><br />` +
    `This email has been sent via contact form. The sender ip address is ${ip}<br />` +
    `</div>`;

  const mailData = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: "Contact form: " + data.subject,
    text: data.message,
    html: mailBody,
  };

  await transporter.sendMail(mailData, function (err : string, info: any) {
    if (err) {
      console.log(err);

      res.status(200).json({
        status: false,
        statusText: "failure",
        message:
          "I couldn't get your email, because there is a problem with SMTP server. Can you try again later?",
      });
    } else {
      console.log("Message sent: %s", info.messageId);

      res.status(200).json({
        status: true,
        statusText: "success",
        message:
          "I received your email and i will return back to you as soon as possible.",
      });
    }
  });
}
