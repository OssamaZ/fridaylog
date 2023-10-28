"use client"

import { api } from "@/trpc/react";
import { Card } from "@fridaylog/ui";

export default function ClientCard() {
  const hello = api.example.hello.useQuery({text: "client"})
  return (
    <Card title="Client">
      {hello ? hello.data?.greeting : "Loading tRPC query..."}
    </Card>
  )
}