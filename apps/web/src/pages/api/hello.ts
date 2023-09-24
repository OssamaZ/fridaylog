import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "@fridaylog/database";
import { env } from "@fridaylog/env";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const exampleCount = await prisma.example.count();
  const message = `${env.APP_NAME} ${exampleCount}`;
  res.status(200).json({
    data: `From api: ${message}`,
  });
}
