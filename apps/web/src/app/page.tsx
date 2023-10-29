import { api } from "../trpc/server";
import { Button, Card } from "@fridaylog/ui";
import { env } from "@fridaylog/env";
import ClientCard from "./card";

export default async function Home() {
  const { greeting } = await api.example.hello.query({text: "server"});
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-2">
      <h1>{env.NEXT_PUBLIC_APP_NAME}</h1>
      <Card title="Server">
        { greeting ? greeting : "Loading tRPC query..." }
      </Card>
      <ClientCard />
      <div className="flex space-x-2">
        <Button variant="default">Action</Button>
      </div>
    </main>
  );
}
