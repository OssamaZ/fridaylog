import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { prisma } from "@fridaylog/database";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

// import { env } from "@fridaylog/env.mjs";
// import { db } from "@fridaylog/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    signIn: "auth/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      sendVerificationRequest: async function ({ identifier: email, url }) {
        const { host } = new URL(url);
        await resend.emails.send({
          from: "Ossama <ossama@fridaylog.com>",
          to: [email],
          subject: `Confirm your email`,
          html: loginHtmlTemplate({ url, host, email }),
          text: `Sign in to ${host}\n${url}\n\n`,
          // headers: { "X-Entity-Ref-ID": uid() }
          // react: EmailTemplate({ firstName: 'John' }),
        });

        // await emailClient.send({
        //   to: email,
        //   from: {
        //     email: "no-reply@startupsquare.co",
        //     name: "StartupSquare Team",
        //   },
        //   subject: `Confirm your email`,
        //   html: loginHtmlTemplate({ url, host, email }),
        //   text: `Sign in to ${host}\n${url}\n\n`,
        //   headers: { "X-Entity-Ref-ID": uid() },
        // });
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

function loginHtmlTemplate({
  url,
  host,
  email,
}: Record<"url" | "host" | "email", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const _escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
    <table
        style="
          width: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
            sans-serif;
        "
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tr>
          <td align="center" style="background-color: #f1f5f9">
          <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="
            background: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 16px;
            color: #444444;
          "
        >
          <tr>
            <td>
              <div style="padding: 20px 20px 0">
                <p style="font-size: 24px; margin: 0">Welcome to Startup Square,</p>
                <p style="margin: 20px 0 0">
                  Please confirm your email <strong>${escapedEmail}</strong>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="padding: 24px 20px">
                <a
                  href="${url}"
                  target="_blank"
                  style="
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    background-color: #346df1;
                    border: 1px solid #346df1;
                    border-radius: 4px;
                    display: inline-block;
                    font-weight: bold;
                  "
                  >Sign in now</a
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="padding: 0 20px 20px">
              </div>
            </td>
          </tr>
        </table>
          </td>
        </tr>
    </table>
`;
}
