// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type ContactForm = {
  status: boolean,
  statusText: string,
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ContactForm>) {
  const data = req.body
  
  res
    .status(200)
    .json({
      status: true,
      statusText: "success",
      message: "I received your email and i will return back to you as soon as possible.",
    });
}
