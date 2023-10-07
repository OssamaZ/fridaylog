import { env } from "@fridaylog/env";
import { Resend } from "resend";
import MagicLinkEmail from "./templates/magic-link";

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationRequestEmail({
  url,
  host,
  email,
}: Record<"url" | "host" | "email", string>) {
  await resend.emails.send({
    from: "Ossama <ossama@fridaylog.com>",
    to: [email],
    subject: `Confirm your email`,
    // html: loginHtmlTemplate({ url, host, email }),
    react: <MagicLinkEmail link={url} />,
    text: `Sign in to ${host}\n${url}\n\n`,
    // headers: { "X-Entity-Ref-ID": uid() }
    // react: EmailTemplate({ firstName: 'John' }),
  });
}
