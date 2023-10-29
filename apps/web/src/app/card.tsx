"use client"

import { Card } from "@fridaylog/ui";
import { api } from "../trpc/react";

export default function ClientCard() {
  const {data} = api.example.hello.useQuery({text: "client"})
  return (
    <Card title="Client">
      {data ? data.greeting : "Loading tRPC query..."}
    </Card>
  )
}