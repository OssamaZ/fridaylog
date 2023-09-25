import { useEffect, useState } from "react";
import { Button, Card } from "@fridaylog/ui";
import { env } from "@fridaylog/env";
import { api } from "../utils/api";

export default function Page(): JSX.Element {
  const [data, setData] = useState("Loading ..");
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  useEffect(() => {
    void (async function getHello() {
      try {
        const resp = await fetch("/api/hello");
        const _data = (await resp.json()) as Record<"data", string>;
        setData(_data.data);
      } catch (error) {
        setData("Error");
      }
    })();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-2">
      <h1>{env.NEXT_PUBLIC_APP_NAME}</h1>
      <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
      <Card>{data}</Card>
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
