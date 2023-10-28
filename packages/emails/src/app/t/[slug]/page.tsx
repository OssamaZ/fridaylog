import { promises as fs } from "fs";
import { join } from "path";
import { render } from "@react-email/render";
import Preview from "./preview";

export default async function Page({ params }) {
  const Email = (await import(`../../../templates/${params.slug}`)).default;
  const previewProps = Email.PreviewProps || {};
  const markup = render(<Email {...previewProps} />, { pretty: true });
  const plainText = render(<Email {...previewProps} />, { plainText: true });
  const reactMarkup: string = await fs.readFile(join(process.cwd(), "src/templates", `${params.slug}.tsx`), {
    encoding: "utf-8",
  });

  return <Preview slug={params.slug} markup={markup} reactMarkup={reactMarkup} plainText={plainText} />;
}

// export async function generateMetadata({ params }) {
//   return { title: `${params.slug} — React Email` };
// }
