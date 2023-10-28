import * as React from "react";

export function Card({ children, title }: { children: React.ReactNode, title?: string; }): JSX.Element {
  return (
    <div className="rounded-lg border bg-white p-10 shadow-sm">
      {title && <h1 className="mb-2 text-center text-sm text-slate-400">{title}</h1>}
      <div>{children}</div>
    </div>
  );
}
