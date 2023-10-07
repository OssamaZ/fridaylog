"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PreviewLink({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={`/t/${name}`}
      className={`text-sm font-medium ${pathname.includes(name) ? "text-blue-600" : ""}`}>
      {name}
    </Link>
  );
}
