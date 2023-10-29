import NextAuth from "next-auth";

import { authOptions } from "@fridaylog/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- trust me bro
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
