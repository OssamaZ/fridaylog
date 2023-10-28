import { promises as fs } from "fs";
import { join } from "path";
// import { render } from "@react-email/render";
import Preview from "./preview";

import { convert } from "html-to-text";
import pretty from "pretty";

interface Options {
  pretty?: boolean;
  plainText?: boolean;
}

const render = async (component: React.ReactElement, options?: Options) => {
  const {renderToStaticMarkup} = (await import('react-dom/server')).default
  
  if (options?.plainText) {
    return convert(renderToStaticMarkup(component), {
      selectors: [
        { selector: "img", format: "skip" },
        { selector: "#__react-email-preview", format: "skip" },
      ],
    })
  }
  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = renderToStaticMarkup(component);
  const document = `${doctype}${markup}`;

  if (options && options.pretty) {
    return pretty(document);
  }

  return document;
};

export default async function Page({ params }) {
  const Email = (await import(`../../../templates/${params.slug}`)).default;
  const previewProps = Email.PreviewProps || {};
  const markup = await render(<Email {...previewProps} />, { pretty: true });
  const plainText = await render(<Email {...previewProps} />, { plainText: true });
  const reactMarkup: string = await fs.readFile(join(process.cwd(), "src/templates", `${params.slug}.tsx`), {
    encoding: "utf-8",
  });

  return <Preview slug={params.slug} markup={markup} reactMarkup={reactMarkup} plainText={plainText} />;
}

// export async function generateMetadata({ params }) {
//   return { title: `${params.slug} — React Email` };
// }
