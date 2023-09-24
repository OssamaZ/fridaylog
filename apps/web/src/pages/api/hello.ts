import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "@fridaylog/database";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const examples = await prisma.example.findMany();
  const message = examples[0].name || "World";
  res.status(200).json({
    data: `Hello ${message}`,
  });
}
