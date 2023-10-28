import { api } from "@/trpc/server";
import { Button, Card } from "@fridaylog/ui";
import { env } from "@fridaylog/env";
import ClientCard from "./card";

export default async function Home() {
  const hello = await api.example.hello.query({text: "server"});
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-2">
      <h1>{env.NEXT_PUBLIC_APP_NAME}</h1>
      <Card title="Server">
        {hello ? hello.greeting : "Loading tRPC query..."}
      </Card>
      <ClientCard />
      <div className="flex space-x-2">
        <Button variant="default">Button :)</Button>
        <Button variant="secondary">Button :)</Button>
        <Button variant="outline">Button :)</Button>
        <Button variant="ghost">Button :)</Button>
        <Button variant="link">Button :)</Button>
        <Button variant="destructive">Button :)</Button>
      </div>
    </main>
  );
}
