import { Card } from "@fridaylog/ui";
import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const [data, setData] = useState("Loading ..");
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
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50">
      <Card>{data}</Card>
    </main>
  );
}
