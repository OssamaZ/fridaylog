import { env } from "@fridaylog/env";
// import { Resend } from "resend";
import MagicLinkEmail from "./templates/magic-link";

const RESEND_API_KEY = env.RESEND_API_KEY;
// export const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationRequestEmail({
  url,
  host,
  email,
}: Record<"url" | "host" | "email", string>) {
  if (env.NODE_ENV === "development") {
    console.log(url)
    return;
  }

  return await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Ossama <ossama@fridaylog.com>",
      to: [email],
      subject: `Confirm your email`,
      // react: <MagicLinkEmail link={url} />,
      text: `Sign in to ${host}\n${url}\n\n`,
    }),
  });

  // await resend.emails.send({
  //   from: "Ossama <ossama@fridaylog.com>",
  //   to: [email],
  //   subject: `Confirm your email`,
  //   react: <MagicLinkEmail link={url} />,
  //   text: `Sign in to ${host}\n${url}\n\n`,
  //   // headers: { "X-Entity-Ref-ID": uid() }
  // });
}
