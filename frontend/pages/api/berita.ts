import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/services/db";
import Berita from "@/models/berita";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const all = await Berita.find();
    return res.status(200).json(all);
  }

  if (req.method === "POST") {
    const created = await Berita.create(req.body);
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
