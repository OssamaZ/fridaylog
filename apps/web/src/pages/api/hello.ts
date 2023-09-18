import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@fridaylog/prisma";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const examples = await prisma.example.findMany();
  const message = examples[0]?.name || "World";
  res.status(200).json({
    data: `Hello ${message}`,
  });
}
