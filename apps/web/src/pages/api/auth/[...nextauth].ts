import NextAuth from "next-auth";
import { authOptions } from "@fridaylog/server/auth-options";

export default NextAuth(authOptions);
