"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Preview({ slug, markup, reactMarkup, plainText }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState("desktop");
  const [activeLang, setActiveLang] = useState("jsx");

  useEffect(() => {
    const view = searchParams.get("view");
    const lang = searchParams.get("lang");

    if (view === "source" || view === "desktop") {
      setActiveView(view);
    }

    if (lang === "jsx" || lang === "markup" || lang === "markdown") {
      setActiveLang(lang);
    }
  }, [searchParams]);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    router.push(`${pathname}?view=${view}`);
  };

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    router.push(`${pathname}?view=source&lang=${lang}`);
  };

  return (
    <div className="flex min-h-screen">
      {
        activeView === "desktop" ? (
          <iframe srcDoc={markup} className="h-[calc(100vh_-_140px)] w-full" />
        ) : null
        // <div className="flex gap-6 mx-auto p-6 max-w-3xl">
        //     <CodeContainer
        //       markups={[
        //         { language: 'jsx', content: reactMarkup },
        //         { language: 'markup', content: markup },
        //         { language: 'markdown', content: plainText },
        //       ]}
        //       activeLang={activeLang}
        //       setActiveLang={handleLangChange}
        //     />
        // </div>
      }
    </div>
  );
}
