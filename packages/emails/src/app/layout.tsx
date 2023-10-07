import "tailwind-config/styles.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import PreviewLink from "./preview-link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const emailsDirectory = path.join(process.cwd(), "src/templates");
  const filenames = await fs.readdir(emailsDirectory);
  const emails = filenames
    .map((file) => file.replace(/\.(jsx|tsx)$/g, ""))
    .filter((file) => file !== "components");

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen">
          <div className="flex w-screen flex-col gap-4 border-r bg-slate-50 p-6 md:w-full md:min-w-[275px] md:max-w-[275px]">
            {emails.map((name) => (
              <PreviewLink key={name} name={name} />
            ))}
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
