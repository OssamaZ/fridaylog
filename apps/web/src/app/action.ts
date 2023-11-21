"use server";

import { env } from "@fridaylog/env";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function SignupForWaitlist(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });

  if (parsed.success) {
    try {
      const response = await fetch("https://app.loops.so/api/v1/contacts/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsed.data.email,
          fridaylog: true,
        }),
      });
      const data = await response.json();
      console.log(data);
      return {
        message: "🎉 You're successfully added to the waitlist!",
      };
    } catch (error) {
      console.log(error);
      return { message: "❌ Something went wrong, please try again!" };
    }
  } else {
    return { message: "❌ Please enter a valid email!" };
  }
}
