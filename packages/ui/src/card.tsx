import * as React from "react";

export function Card({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="rounded-lg border bg-white p-10 shadow-sm">
      <h1 className="mb-2 text-center text-sm text-slate-400">Card</h1>
      <div>{children}</div>
    </div>
  );
}
