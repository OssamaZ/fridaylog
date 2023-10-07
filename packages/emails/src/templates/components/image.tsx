import { env } from "@fridaylog/env";
import { Img } from "@react-email/img";
import * as React from "react";

const basePath = env.APP_URL;

type ImageProps = Omit<Parameters<typeof Img>[0], "src"> & {
  path: string;
};

export function Image({ path, ...props }: ImageProps) {
  return <Img src={`${basePath}${path}`} {...props} />;
}
